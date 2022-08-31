import { createSlice } from "@reduxjs/toolkit";

const landlordSignupSlice = createSlice({
    name: "landlordSignupSlice",
    initialState: {
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
});

export default landlordSignupSlice.reducer;
export const updateInfo = landlordSignupSlice.actions.updateLandlordInfo;
export const updateLandlordPropertyInfo =
    landlordSignupSlice.actions.updateLandlordPropertyInfo;
export const updateLandlordTenantInfo =
    landlordSignupSlice.actions.updateLandlordTenantInfo;
export const updateAccessCode = landlordSignupSlice.actions.updateAccessCode;
