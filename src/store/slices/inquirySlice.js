import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../dummy-data";

const inquirySlice = createSlice({
    name: "inquirySlice",
    initialState: {
        complete: false,
        inquiries: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addInquiryAPI.fulfilled, (state, action) => {
            state.complete = true;
            state.inquiries.push(action.payload);
        });
    },
});

export const addInquiryAPI = createAsyncThunk(
    "inquirySlice/addInquiryAPI",
    async ({ title, description }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const newInquiry = {
                title: title,
                description: description,
                tenantId: state.sessionSlice.tenantId,
                messages: [],
                startDate: new Date().toDateString(),
            };
            const responseAddInquiry = await fetch(
                firebase_database_url + "/inquiry.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInquiry),
                }
            );
            const result = await responseAddInquiry.json();
            if (result.error) {
                throw new Error(
                    "Error adding inquiry. \n" + result.error.message
                );
            }

            return newInquiry;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export default inquirySlice.reducer;
