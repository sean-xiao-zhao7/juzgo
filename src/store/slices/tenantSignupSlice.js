import { createSlice } from "@reduxjs/toolkit";

const tenantSignupSlice = createSlice({
    name: "tenantSignupSlice",
    initialState: {
        accessCode: "",
        propertyInfo: {},
        landlordInfo: {},
        personalInfo: {},
    },
    reducers: {
        updateAccessCode: (state, action) => {
            state.accessCode = action.payload.accessCode;
        },
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
});

export default tenantSignupSlice.reducer;
export const updateAccessCode = tenantSignupSlice.actions.updateAccessCode;
export const updatePropertyInfo = tenantSignupSlice.actions.updatePropertyInfo;
export const updateLandlordInfo = tenantSignupSlice.actions.updateLandlordInfo;
export const updatePersonalInfo = tenantSignupSlice.actions.updatePersonalInfo;
