import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    firebase_signup_url,
    firebase_siginpassword_url,
} from "../../dummy-data";

const sessionSlice = createSlice({
    name: "sessionSlice",
    initialState: {
        type: "",
        email: "",
        password: "",
        userInfo: {},
        idToken: "",
    },
    reducers: {
        signUp: (state, action) => {
            state.email = action.payload.emailPassword.email;
            state.password = action.payload.emailPassword.password;

            state.type = action.payload.info.type;
            state.userInfo = action.payload.personalInfo;
        },
        signOut: (state, action) => {
            state.type = action.payload.type;
        },
        updateInfo: (state, action) => {
            // update some personal info
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.idToken = action.payload.idToken;
            })
            .addCase(signUpAPI.fulfilled, (state, action) => {
                state.idToken = action.payload.idToken;
            });
    },
});
export const signUpAPI = createAsyncThunk(
    "sessionSlice/signUpAPIAction",
    async (emailPassword, thunkAPI) => {
        const response = await fetch(firebase_signup_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailPassword.email,
                password: emailPassword.password,
                returnSecureToken: true,
            }),
        });
        const result = await response.json();
        return result;

        // upload additional info (user info, properties, etc)
    }
);

export const signIn = createAsyncThunk(
    "sessionSlice/signInAction",
    async ({ email, password }, thunkAPI) => {
        const response = await fetch(firebase_siginpassword_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
        });

        const result = await response.json();
        return result;
    }
);

export default sessionSlice.reducer;
export const signUp = sessionSlice.actions.signUp;
export const signOut = sessionSlice.actions.signOut;
export const updateInfo = sessionSlice.actions.updateInfo;
