import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../dummy-data";

const tenantSignupSlice = createSlice({
    name: "tenantSignupSlice",
    initialState: {
        accessCode: "",
        propertyInfo: {},
        landlordInfo: {},
        personalInfo: {},
        loading: false,
        error: "",
    },
    reducers: {
        updatePropertyInfo: (state, action) => {
            state.propertyInfo = action.payload.propertyInfo;
        },
        updateLandlordInfo: (state, action) => {
            state.landlordInfo = action.payload.landlordInfo;
        },
        updatePersonalInfo: (state, action) => {
            state.personalInfo = action.payload.personalInfo;
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
            })
            .addCase(verifyAccessCode.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const verifyAccessCode = createAsyncThunk(
    "tenantSignupSlice/updateAccessCode",
    async (accessCode, thunkAPI) => {
        try {
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

            return {
                propertyInfo,
                landlordInfo,
                accessCode,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const updateTenantDB = createAsyncThunk(
    "tenantSignupSlice/updateTenantDB",
    async (data, thunkAPI) => {}
);

export default tenantSignupSlice.reducer;
export const updatePropertyInfo = tenantSignupSlice.actions.updatePropertyInfo;
export const updateLandlordInfo = tenantSignupSlice.actions.updateLandlordInfo;
export const updatePersonalInfo = tenantSignupSlice.actions.updatePersonalInfo;
