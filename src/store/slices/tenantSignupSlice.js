import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url, firebase_signup_url } from "../../dummy-data";
import { authenticate } from "./sessionSlice";

const tenantSignupSlice = createSlice({
    name: "tenantSignupSlice",
    initialState: {
        accessCode: "",
        propertyInfo: {},
        landlordInfo: {},
        tenantInfo: {},
        loading: false,
        error: "",
        complete: false,
        tenantID: "",
    },
    reducers: {
        updatePropertyInfo: (state, action) => {
            state.propertyInfo = action.payload.propertyInfo;
        },
        updateLandlordInfo: (state, action) => {
            state.landlordInfo = action.payload.landlordInfo;
        },
        updateTenantInfo: (state, action) => {
            state.tenantInfo = action.payload.tenantInfo;
        },
        unsetAccessCode: (state, action) => {
            state.accessCode = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTenantDB.fulfilled, (state, action) => {
                if (action.payload === "error") {
                    state.complete = false;
                } else {
                    state.complete = true;
                }
            })
            .addCase(verifyAccessCode.fulfilled, (state, action) => {
                state.accessCode = action.payload.accessCode;
                state.propertyInfo = action.payload.propertyInfo;
                state.landlordInfo = action.payload.landlordInfo;
                state.tenantInfo = action.payload.tenantInfo;
                state.tenantID = action.payload.tenantInfo.tenantID;
            })
            .addCase(verifyAccessCode.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const verifyAccessCode = createAsyncThunk(
    "tenantSignupSlice/verifyAccessCode",
    async (accessCode, thunkAPI) => {
        try {
            accessCode = accessCode.trim();

            // 1. Pull property matching access code
            const responseProperty = await fetch(
                firebase_database_url + "/property.json",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resultProperty = await responseProperty.json();
            if (resultProperty.error) {
                throw new Error(
                    "Error getting access code. \n" +
                        resultProperty.error.message
                );
            }

            let propertyInfo;
            for (let property in resultProperty) {
                if (resultProperty[property].accessCode === accessCode) {
                    propertyInfo = resultProperty[property];
                    break;
                }
            }

            if (!propertyInfo) {
                throw new Error(
                    `No property matching access code ${accessCode}`
                );
            }

            // 2. Pull landlord matching access code
            const responseLandlord = await fetch(
                firebase_database_url + "/landlord.json",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resultLandlord = await responseLandlord.json();
            if (resultLandlord.error) {
                throw new Error(
                    "Error getting access code. \n" +
                        resultLandlord.error.message
                );
            }
            const landlordInfo = resultLandlord[propertyInfo.landlord];

            // 3. Pull tenant personal info matching access code
            const responseTenant = await fetch(
                firebase_database_url + "/tenant.json",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resultTenant = await responseTenant.json();
            if (resultTenant.error) {
                throw new Error(
                    "Error getting access code. \n" + resultTenant.error.message
                );
            }

            let tenantInfo;
            for (let tenant in resultTenant) {
                if (resultTenant[tenant].accessCode === accessCode) {
                    tenantInfo = { ...resultTenant[tenant], tenantID: tenant };
                    break;
                }
            }

            if (!tenantInfo) {
                throw new Error(`No tenant matching access code ${accessCode}`);
            }

            return {
                propertyInfo,
                landlordInfo,
                tenantInfo,
                accessCode,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const updateTenantDB = createAsyncThunk(
    "tenantSignupSlice/updateTenantDB",
    async (emailPassword, thunkAPI) => {
        try {
            const state = thunkAPI.getState();

            const responseSignup = await fetch(firebase_signup_url, {
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
            const resultSignup = await responseSignup.json();
            if (resultSignup.error) {
                throw new Error(
                    "Error signing up. \n" + resultSignup.error.message
                );
            }
            const idToken = resultSignup.idToken;

            // add userUID to existing tenant info added by landlord

            const responseUpdateTenant = await fetch(
                firebase_database_url +
                    `/tenant/${state.tenantSignupSlice.tenantID}.json?auth=` +
                    idToken,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...state.tenantSignupSlice.tenantInfo,
                        userUID: resultSignup.localId,
                        accessCode: state.tenantSignupSlice.accessCode,
                        landlord: state.tenantSignupSlice.propertyInfo.landlord,
                    }),
                }
            );

            const resultUpdateTenant = await responseUpdateTenant.json();
            if (resultUpdateTenant.error) {
                throw new Error(
                    "Error updating tenant userUID. \n" +
                        resultUpdateTenant.error.message
                );
            }

            // 5. update sessionSlice
            thunkAPI.dispatch(
                authenticate({
                    ...resultSignup,
                    type: "tenant",
                    tenant: resultUpdateTenant.name,
                })
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export default tenantSignupSlice.reducer;
export const updatePropertyInfo = tenantSignupSlice.actions.updatePropertyInfo;
export const updateLandlordInfo = tenantSignupSlice.actions.updateLandlordInfo;
export const updateTenantInfo = tenantSignupSlice.actions.updateTenantInfo;
export const unsetAccessCode = tenantSignupSlice.actions.unsetAccessCode;
