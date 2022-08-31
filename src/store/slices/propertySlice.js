import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../dummy-data";

const propertySlice = createSlice({
    name: "propertySlice",
    initialState: {
        properties: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.properties = action.payload;
            })
            .addCase(addProperty.fulfilled, (state, action) => {
                state.properties.push(action.payload);
            });
    },
});

export const fetchProperties = createAsyncThunk(
    "propertySlice/fetchProperties",
    async () => {
        const response = await fetch(firebase_database_url + "/property.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    }
);

export const addProperty = createAsyncThunk(
    "propertySlice/addProperty",
    async (propertyInfo) => {
        const response = await fetch(firebase_database_url + "/property.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(propertyInfo),
        });
        const result = await response.json();
        return propertyInfo;
    }
);

export default propertySlice.reducer;
