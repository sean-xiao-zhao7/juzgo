import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    firebase_siginpassword_url,
    firebase_database_url,
    manager,
} from "../../dummy-data";
import {
    saveSession,
    retrieveSession,
    destroySession,
} from "../helper/session";

// constants
import { INVALID_LOGIN, SERVER_ERROR } from "../../constants/errors";

const sessionSlice = createSlice({
    name: "sessionSlice",
    initialState: {
        type: "",
        email: "",
        idToken: "",
        error: "",
        landlordId: "",
        tenantId: "",
        userUID: "",
        userInfo: {},
    },
    reducers: {
        authenticate: (state, action) => {
            state.idToken = action.payload.idToken;
            state.type = action.payload.type;
            state.email = action.payload.email;
            state.landlordId = action.payload.landlordId;
            state.userUID = action.payload.userUID;
            state.userInfo = action.payload.userInfo;
        },
        signOut: (state, action) => {
            destroySession();
            state.idToken = "";
            state.type = "";
            state.email = "";
            state.landlordId = "";
            state.userUID = "";
            state.userInfo = {};
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
                    state.tenantId = action.payload.tenantId;
                    state.userUID = action.payload.userUID;
                    state.userInfo = action.payload.userInfo;
                    saveSession(state);
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
                        state.landlordId = action.payload.landlordId;
                        state.tenantId = action.payload.tenantId;
                        state.userUID = action.payload.userUID;
                        state.userInfo = action.payload.userInfo;
                    }
                }
            });
    },
});

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

            // retrieve userinfo from db to check if user is landlord or tenant
            response = await fetch(
                firebase_database_url + `/landlord.json?auth=${result.idToken}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const landlordsResult = await response.json();
            if (landlordsResult.error) {
                throw new Error(SERVER_ERROR);
            }

            let currentUserUID = result.localId;
            for (const key in landlordsResult) {
                if (landlordsResult[key].userUID === currentUserUID) {
                    result = {
                        ...result,
                        type: "landlord",
                        landlordId: key,
                        userUID: currentUserUID,
                        userInfo: landlordsResult[key],
                    };
                    break;
                }
            }

            // user is a tenant
            if (!result.type) {
                response = await fetch(
                    firebase_database_url +
                        `/tenant.json?auth=${result.idToken}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const tenantResult = await response.json();
                if (tenantResult.error) {
                    throw new Error(SERVER_ERROR);
                }

                for (const key in tenantResult) {
                    if (tenantResult[key].userUID === currentUserUID) {
                        result = {
                            ...result,
                            type: "tenant",
                            tenantId: key,
                            userUID: currentUserUID,
                            userInfo: tenantResult[key],
                        };
                        break;
                    }
                }
            }

            if (manager.includes(result.email)) {
                result.type = "manager";
            } else if (!result.type) {
                result.type = "none";
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
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
