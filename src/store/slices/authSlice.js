// firebase
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        resetEmailSent: false,
        error: null,
    },
    reducers: {
        initiateResetPassword: (state, action) => {
            state.resetEmailSent = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initiateResetPasswordAction.fulfilled,
            (state, action) => {
                state.resetEmailSent = true;
                state.error = null;
            }
        );
    },
});

export const initiateResetPasswordAction = createAsyncThunk(
    "authSlice/initiateResetPasswordAction",
    async ({ email }) => {
        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            sendPasswordResetEmail(auth, email)
                .then(() => {})
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
);

export default authSlice.reducer;
export const initiateResetPassword = authSlice.actions.initiateResetPassword;
