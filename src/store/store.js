import { configureStore } from "@reduxjs/toolkit";
import landlordSignupSlice from "./slices/landlordSignupSlice";
import tenantSignupSlice from "./slices/tenantSignupSlice";

const store = configureStore({
    reducer: { landlordSignupSlice, tenantSignupSlice },
});

export default store;
