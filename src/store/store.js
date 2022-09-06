import { configureStore } from "@reduxjs/toolkit";
import landlordSignupSlice from "./slices/landlordSignupSlice";
import tenantSignupSlice from "./slices/tenantSignupSlice";
import sessionSlice from "./slices/sessionSlice";
import propertySlice from "./slices/propertySlice";

const store = configureStore({
    reducer: {
        landlordSignupSlice,
        tenantSignupSlice,
        sessionSlice,
        propertySlice,
    },
});

export default store;
