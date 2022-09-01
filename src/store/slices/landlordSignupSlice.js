import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { firebase_database_url } from "../../dummy-data";

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
            state.complete = true;
        });
    },
});

export const updateLandlordDB = createAsyncThunk(
    "landlordSignupSlice/updateLandlordDB",
    async (info) => {
        let newInfo;

        // 1. add landlord
        const response = await fetch(firebase_database_url + "/landlord.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info.personalInfo),
        });
        const result = await response.json();

        // 2. add tenant
        newInfo = { ...info.landlordTenantInfo, landlord: result.name };
        const response2 = await fetch(firebase_database_url + "/tenant.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newInfo),
        });
        const result2 = await response2.json();

        // 3. add property belonging to this landlord and tenant
        newInfo = {
            ...info.landlordPropertyInfo,
            landlord: result.name,
            tenant: result2.name,
        };
        const response3 = await fetch(
            firebase_database_url + "/property.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newInfo),
            }
        );
        const result3 = await response3.json();

        return result;
    }
);

export default landlordSignupSlice.reducer;
export const updateInfo = landlordSignupSlice.actions.updateLandlordInfo;
export const updateLandlordPropertyInfo =
    landlordSignupSlice.actions.updateLandlordPropertyInfo;
export const updateLandlordTenantInfo =
    landlordSignupSlice.actions.updateLandlordTenantInfo;
export const updateAccessCode = landlordSignupSlice.actions.updateAccessCode;
