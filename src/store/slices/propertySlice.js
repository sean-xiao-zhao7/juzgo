import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase_database_url } from "../../dummy-data";

const propertySlice = createSlice({
    name: "propertySlice",
    initialState: {
        properties: [],
        loading: false,
        newProperty: {},
        newTenant: {},
        accessCode: "",
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = !state.loading;
        },
        addNewProperty: (state, action) => {
            state.newProperty = action.payload.newProperty;
        },
        addNewTenant: (state, action) => {
            state.newTenant = action.payload.newTenant;
        },
        addAccessCode: (state, action) => {
            state.accessCode = action.payload.accessCode;
            state.properties.push(state.newProperty);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.fulfilled, (state, action) => {
                const properties = [];
                for (const property in action.payload) {
                    properties.push(action.payload[property]);
                }
                state.properties = properties;
            })
            .addCase(updateAPI.fulfilled, (state, action) => {
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

export const updateAPI = createAsyncThunk(
    "propertySlice/addPropertyAPI",
    async (propertyInfo) => {
        try {
            const response = await fetch(
                firebase_database_url + "/property.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(propertyInfo),
                }
            );
            const result = await response.json();
            if (result.error) {
                throw new Error(result.error);
            }
            return propertyInfo;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
);

export const addNewProperty = propertySlice.actions.addNewProperty;
export const addNewTenant = propertySlice.actions.addNewTenant;
export const addAccessCode = propertySlice.actions.addAccessCode;
export const toggleLoading = propertySlice.actions.toggleLoading;
export default propertySlice.reducer;
