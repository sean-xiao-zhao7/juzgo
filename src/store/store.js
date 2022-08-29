import { configureStore } from "@reduxjs/toolkit";
import userSignupSliceReducer from "./slices/userSignupSlice";

const store = configureStore({
    reducer: { userSignupSliceReducer },
});

export default store;
