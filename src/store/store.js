import { configureStore } from "@reduxjs/toolkit";
import landlordSignupSlice from "./slices/landlordSignupSlice";

const store = configureStore({
    reducer: { landlordSignupSlice },
});

export default store;
