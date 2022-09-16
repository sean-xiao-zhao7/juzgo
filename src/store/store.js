import { configureStore } from "@reduxjs/toolkit";
import landlordSignupSlice from "./slices/landlordSignupSlice";
import tenantSignupSlice from "./slices/tenantSignupSlice";
import sessionSlice from "./slices/sessionSlice";
import propertySlice from "./slices/propertySlice";
import inquirySlice from "./slices/inquirySlice";

const store = configureStore({
    reducer: {
        landlordSignupSlice,
        tenantSignupSlice,
        sessionSlice,
        propertySlice,
        inquirySlice,
    },
});

export default store;
