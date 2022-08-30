import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: "sessionSlice",
    initialState: {
        type: "",
        userInfo: {},
        properties: {},
        inquiries: {},
    },
    reducers: {
        startSession: (state, action) => {
            state.type = action.payload.type;
            // TODO get all properties/inquires
        },
        updateProperty: (state, action) => {
            // update a single property
        },
        updateInquiry: (state, action) => {
            // update a single inquiry
        },
        updateInfo: (state, action) => {
            // update some personal info
        },
    },
});

export default sessionSlice.reducer;
export const startSession = tenantSignupSlice.actions.startSession;
export const updateProperty = tenantSignupSlice.actions.startSession;
export const updateInquiry = tenantSignupSlice.actions.startSession;
export const updateInfo = tenantSignupSlice.actions.startSession;
