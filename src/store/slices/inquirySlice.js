import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../links";

const inquirySlice = createSlice({
    name: "inquirySlice",
    initialState: {
        inquiries: [],
        currentInquiry: null,
        error: "",
    },
    reducers: {
        getInquiry: (state, action) => {
            const inquiry = state.inquiries.filter(
                (inquiry) => inquiry.inquiryId === action.payload
            );
            state.currentInquiry = inquiry[0];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addInquiryAPI.fulfilled, (state, action) => {
                state.inquiries.push(action.payload);
            })
            .addCase(getInquiriesAPI.fulfilled, (state, action) => {
                const inquiries = [];
                for (let key in action.payload.inquiries) {
                    if (
                        action.payload.inquiries[key].landlordId ===
                            action.payload.landlordId ||
                        action.payload.inquiries[key].tenantId ===
                            action.payload.tenantId
                    ) {
                        inquiries.push({
                            ...action.payload.inquiries[key],
                            inquiryId: key,
                        });
                    }
                }
                state.inquiries = inquiries;
            })
            .addCase(addInquiryMessageAPI.fulfilled, (state, action) => {
                const updateInquiryIndex = state.inquiries.findIndex(
                    (inquiry) => inquiry.inquiryId === action.payload.inquiryId
                );
                if (!state.inquiries[updateInquiryIndex].messages) {
                    state.inquiries[updateInquiryIndex].messages = {};
                }

                state.inquiries[updateInquiryIndex].messages[
                    action.payload.messageId
                ] = action.payload.messageObj;

                state.currentInquiry = state.inquiries[updateInquiryIndex];
            });
    },
});

export const getInquiriesAPI = createAsyncThunk(
    "inquirySlice/getInquiriesAPI",
    async (payload, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const idToken = state.sessionSlice.idToken;
            const tenantId = state.sessionSlice.tenantId;
            const landlordId = state.sessionSlice.landlordId;

            const responseInquiries = await fetch(
                firebase_database_url + "/inquiry.json?auth=" + idToken,
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

            return {
                inquiries: result,
                tenantId: tenantId,
                landlordId: landlordId,
            };
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
            const idToken = state.sessionSlice.idToken;

            const newInquiry = {
                title: title,
                description: description,
                tenantId: state.sessionSlice.tenantId,
                landlordId: state.propertySlice.properties[0].landlord,
                property: state.propertySlice.properties[0],
                messages: [],
                startDate: new Date().toDateString(),
            };
            const responseAddInquiry = await fetch(
                firebase_database_url + "/inquiry.json?auth=" + idToken,
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
            const state = thunkAPI.getState();
            const idToken = state.sessionSlice.idToken;

            let isTenant = false;
            if (
                state.sessionSlice.tenantId &&
                state.sessionSlice.tenantId !== ""
            ) {
                isTenant = true;
            }
            const messageObj = {
                message: message,
                date: new Date().toDateString(),
                isTenant: isTenant,
            };
            const responseAddMessage = await fetch(
                firebase_database_url +
                    `/inquiry/${inquiryId}/messages.json?auth=` +
                    idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(messageObj),
                }
            );
            const result = await responseAddMessage.json();
            if (result.error) {
                throw new Error(
                    `Error adding message for inquiry ${inquiryId}. \n` +
                        result.error.message
                );
            }

            return { messageObj, inquiryId, messageId: result.name };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getInquiry = inquirySlice.actions.getInquiry;
export default inquirySlice.reducer;
