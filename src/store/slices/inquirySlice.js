import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../dummy-data";

const inquirySlice = createSlice({
    name: "inquirySlice",
    initialState: {
        inquiries: [],
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addInquiryAPI.fulfilled, (state, action) => {
                state.inquiries.push(action.payload);
            })
            .addCase(getInquiriesAPI.fulfilled, (state, action) => {
                const inquiries = [];
                for (let key in action.payload) {
                    inquiries.push({
                        ...action.payload[key],
                        inquiryId: key,
                    });
                }
                state.inquiries = inquiries;
            })
            .addCase(addInquiryMessageAPI.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const getInquiriesAPI = createAsyncThunk(
    "inquirySlice/getInquiriesAPI",
    async (payload, thunkAPI) => {
        try {
            const responseInquiries = await fetch(
                firebase_database_url + "/inquiry.json",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await responseInquiries.json();
            if (result.error) {
                throw new Error(
                    "Error getting inquiries. \n" + result.error.message
                );
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const addInquiryAPI = createAsyncThunk(
    "inquirySlice/addInquiryAPI",
    async ({ title, description }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const newInquiry = {
                title: title,
                description: description,
                tenantId: state.sessionSlice.tenantId,
                landlordId: state.propertySlice.properties[0].landlord,
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

export const addInquiryMessageAPI = createAsyncThunk(
    "inquirySlice/addInquiryMessagesAPI",
    async ({ inquiryId, message }, thunkAPI) => {
        try {
            const responseAddMessage = await fetch(
                firebase_database_url + `/inquiry/${inquiryId}/messages.json`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message,
                        date: new Date().toDateString(),
                    }),
                }
            );
            const result = await responseAddMessage.json();
            if (result.error) {
                throw new Error(
                    `Error adding message for inquiry ${inquiryId}. \n` +
                        result.error.message
                );
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export default inquirySlice.reducer;
