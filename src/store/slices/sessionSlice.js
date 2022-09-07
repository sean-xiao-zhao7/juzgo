import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    firebase_signup_url,
    firebase_siginpassword_url,
    firebase_database_url,
} from "../../dummy-data";
import { saveSession, retrieveSession } from "../helper/session";

// constants
import { INVALID_LOGIN } from "../../constants/errors";

const sessionSlice = createSlice({
    name: "sessionSlice",
    initialState: {
        type: "",
        email: "",
        password: "",
        idToken: "",
        error: "",
        landlordId: "",
        userUID: "",
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAction.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.idToken = action.payload.idToken;
                    state.type = action.payload.type;
                    state.email = action.payload.email;
                    state.landlordId = action.payload.landlordId;
                    state.userUID = action.payload.userUID;
                }
            })
            .addCase(signUpAction.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.error = action.payload.error;
                } else {
                    state.idToken = action.payload.idToken;
                    state.type = action.payload.type;
                    state.email = action.payload.email;
                }
            })
            .addCase(autoSignInAction.fulfilled, (state, action) => {
                if (action.payload) {
                    if (action.payload.error) {
                        state.error = action.payload.error;
                    } else {
                        state.idToken = action.payload.idToken;
                        state.type = action.payload.type;
                        state.email = action.payload.email;
                    }
                }
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
    }
);

export const signInAction = createAsyncThunk(
    "sessionSlice/signInAction",
    async ({ email, password }, thunkAPI) => {
        try {
            let response = await fetch(firebase_siginpassword_url, {
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

            let result = await response.json();
            if (result.error) {
                throw new Error(INVALID_LOGIN);
            }
            saveSession(result);

            // retrieve userinfo from db to check if user is landlord or tenant
            response = await fetch(firebase_database_url + "/landlord.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const landlords = await response.json();

            result = { ...result, type: "tenant" };
            let currentUserUID = result.localId;
            for (const key in landlords) {
                if (landlords[key].userUID === currentUserUID) {
                    result = {
                        ...result,
                        type: "landlord",
                        landlordId: key,
                        userUID: currentUserUID,
                    };
                }
            }

            return result;
        } catch (error) {
            return {
                error: error.message,
            };
        }
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
