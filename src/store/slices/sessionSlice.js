import { createSlice } from "@reduxjs/toolkit";
import {
    firebase_signup_url,
    firebase_siginpassword_url,
} from "../../dummy-data";

const sessionSlice = createSlice({
    name: "sessionSlice",
    initialState: {
        type: "",
        username: "",
        password: "",
        userInfo: {},
        properties: [],
        inquiries: [],
    },
    reducers: {
        signUp: (state, action) => {
            state.username = action.payload.usernamePassword.username;
            state.password = action.payload.usernamePassword.password;

            state.type = action.payload.landlordInfo.type;
            state.userInfo = action.payload.landlordInfo;
            state.properties.push(action.payload.landlordPropertyInfo);

            // add new account
            fetch(firebase_signup_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: state.username,
                    password: state.password,
                    returnSecureToken: true,
                }),
            })
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => console.log(error));

            // upload additional info (user info, properties, etc)
        },
        signIn: (state, action) => {
            state.type = action.payload.type;
            // TODO get all properties/inquires
        },
        signOut: (state, action) => {
            state.type = action.payload.type;
            // TODO get all properties/inquires
        },
        updateProperty: (state, action) => {
            // update a single property
        },
        updateInquiry: (state, action) => {
            // update a single inquiry
        },
        updateInfo: (state, action) => {
            // update some personal info
        },
    },
});

export default sessionSlice.reducer;
export const signUp = sessionSlice.actions.signUp;
export const signIn = sessionSlice.actions.signIn;
export const signOut = sessionSlice.actions.signOut;
export const updateProperty = sessionSlice.actions.startSession;
export const updateInquiry = sessionSlice.actions.startSession;
export const updateInfo = sessionSlice.actions.startSession;
