import { configureStore } from "@reduxjs/toolkit";
import landlordSignupSlice from "./slices/landlordSignupSlice";
import tenantSignupSlice from "./slices/tenantSignupSlice";
import sessionSlice from "./slices/sessionSlice";

const store = configureStore({
    reducer: { landlordSignupSlice, tenantSignupSlice, sessionSlice },
});

export default store;
