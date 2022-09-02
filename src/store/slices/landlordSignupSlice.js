import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url, firebase_signup_url } from "../../dummy-data";
import { authenticate } from "./sessionSlice";

const landlordSignupSlice = createSlice({
    name: "landlordSignupSlice",
    initialState: {
        complete: false,
        landlordInfo: {},
        landlordPropertyInfo: {},
        landlordTenantInfo: {},
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateLandlordDB.fulfilled, (state, action) => {
            if (action.payload === "error") {
                state.complete = false;
            } else {
                state.complete = true;
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
                throw new Error("Error signing up. \n" + result.error.message);
            }

            // 2. add landlord
            newInfo = { ...info.personalInfo, userUID: result.localId };
            const response2 = await fetch(
                firebase_database_url + "/landlord.json",
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
                firebase_database_url + "/tenant.json",
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
                firebase_database_url + "/property.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            const result4 = await response4.json();

            // 5. update sessionSlice
            thunkAPI.dispatch(
                authenticate({
                    ...result,
                    type: info.type,
                })
            );

            return result;
        } catch (error) {
            console.log(error.message);
            return "error";
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
