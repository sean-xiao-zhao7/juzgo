import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    firebase_signup_url,
    firebase_siginpassword_url,
} from "../../dummy-data";
import { saveSession, retrieveSession } from "../helper/session";

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
        authenticate: (state, action) => {
            state.idToken = action.payload.idToken;
            state.type = action.payload.type;
            state.email = action.payload.email;
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
            .addCase(signInAction.fulfilled, (state, action) => {
                state.idToken = action.payload.idToken;
            })
            .addCase(signUpAction.fulfilled, (state, action) => {
                state.idToken = action.payload.idToken;
            })
            .addCase(autoSignInAction.fulfilled, (state, action) => {
                state.idToken = action.payload.idToken;
                state.type = action.payload.type;
                state.email = action.payload.email;
            });
    },
});

export const signUpAction = createAsyncThunk(
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
        saveSession(result);
        return result;

        // upload additional info (user info, properties, etc)
    }
);

export const signInAction = createAsyncThunk(
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
        saveSession(result);
        return result;
    }
);

export const autoSignInAction = createAsyncThunk(
    "sessionSlice/autoSignInAction",
    async () => {
        return retrieveSession();
    }
);

export default sessionSlice.reducer;
export const authenticate = sessionSlice.actions.authenticate;
export const signOut = sessionSlice.actions.signOut;
export const updateInfo = sessionSlice.actions.updateInfo;
