import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url, firebase_signup_url } from "../../dummy-data";
import { authenticate } from "./sessionSlice";

import {
    EMAIL_EXISTS_ERROR,
    REGISTER_GENERAL_ERROR,
} from "../../constants/errors";

const landlordSignupSlice = createSlice({
    name: "landlordSignupSlice",
    initialState: {
        complete: false,
        landlordInfo: {},
        landlordPropertyInfo: {},
        landlordTenantInfo: {},
        error: false,
    },
    reducers: {
        updateLandlordInfo: (state, action) => {
            state.landlordInfo = action.payload.landlordInfo;
        },
        updateLandlordPropertyInfo: (state, action) => {
            state.landlordPropertyInfo = action.payload.landlordPropertyInfo;
        },
        updateLandlordTenantInfo: (state, action) => {
            state.landlordTenantInfo = action.payload.landlordTenantInfo;
        },
        updateAccessCode: (state, action) => {
            state.landlordTenantInfo.accessCode = action.payload.accessCode;
            state.landlordPropertyInfo.accessCode = action.payload.accessCode;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateLandlordDB.fulfilled, (state, action) => {
                state.error = false;
                if (action.payload === "error") {
                    state.complete = false;
                } else {
                    state.complete = true;
                }
            })
            .addCase(updateLandlordDB.rejected, (state, action) => {
                if (
                    action.error.message &&
                    action.error.message.includes("EMAIL_EXISTS")
                ) {
                    state.error = EMAIL_EXISTS_ERROR;
                } else {
                    state.error = REGISTER_GENERAL_ERROR;
                }
            });
    },
});

export const updateLandlordDB = createAsyncThunk(
    "landlordSignupSlice/updateLandlordDB",
    async (payload, thunkAPI) => {
        let newInfo;
        const info = payload.info;
        const emailPassword = payload.emailPassword;
        try {
            // 1. add user account
            const response1 = await fetch(firebase_signup_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailPassword.email,
                    password: emailPassword.password,
                    returnSecureToken: true,
                }),
            });
            const result = await response1.json();
            if (result.error) {
                throw new Error(result.error.message);
            }

            const idToken = result.idToken;

            // 2. add landlord
            newInfo = { ...info.personalInfo, userUID: result.localId };
            const response2 = await fetch(
                firebase_database_url + "/landlord.json?auth=" + idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            const result2 = await response2.json();

            // 3. add tenant
            newInfo = { ...info.landlordTenantInfo, landlord: result2.name };
            const response3 = await fetch(
                firebase_database_url + "/tenant.json?auth=" + idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            const result3 = await response3.json();

            // 4. add property belonging to this landlord and tenant
            newInfo = {
                ...info.landlordPropertyInfo,
                landlord: result2.name,
                tenant: result3.name,
            };
            const response4 = await fetch(
                firebase_database_url + "/property.json?auth=" + idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            await response4.json();

            // 5. update sessionSlice
            thunkAPI.dispatch(
                authenticate({
                    ...result,
                    type: info.type,
                    landlord: result2.name,
                    tenant: result3.name,
                })
            );

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export default landlordSignupSlice.reducer;
export const updateInfo = landlordSignupSlice.actions.updateLandlordInfo;
export const updateLandlordPropertyInfo =
    landlordSignupSlice.actions.updateLandlordPropertyInfo;
export const updateLandlordTenantInfo =
    landlordSignupSlice.actions.updateLandlordTenantInfo;
export const updateAccessCode = landlordSignupSlice.actions.updateAccessCode;
