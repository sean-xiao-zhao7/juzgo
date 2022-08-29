import { createSlice } from "@reduxjs/toolkit";

const userSignupSlice = createSlice({
    name: "userSignupSlice",
    initialState: {
        userInfo: {},
    },
    reducers: {
        updateInfo: (state, action) => {
            state.userInfo = action.payload.userInfo;
        },
    },
});

export default userSignupSlice.reducer;
export const updateInfo = userSignupSlice.actions.updateInfo;
