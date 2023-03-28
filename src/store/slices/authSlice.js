import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        resetEmailSent: false,
        error: null,
    },
    reducers: {
        initiateResetPassword: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(
            initiateResetPasswordAction.fulfilled,
            (state, action) => {
                state.resetEmailSent = true;
            }
        );
    },
});

export const initiateResetPasswordAction = createAsyncThunk(
    "authSlice/initiateResetPasswordAction",
    async ({ email }) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
);

export default authSlice.reducer;
export const initiateResetPassword = authSlice.actions.initiateResetPassword;
