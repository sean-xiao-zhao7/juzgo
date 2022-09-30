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
        actionCompleted: false,
        error: "",
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.loading = !state.loading;
        },
        unsetActionCompleted: (state, action) => {
            state.actionCompleted = false;
        },
        addNewProperty: (state, action) => {
            state.newProperty = action.payload.newProperty;
        },
        addNewTenant: (state, action) => {
            state.newTenant = action.payload.newTenant;
        },
        addAccessCode: (state, action) => {
            state.accessCode = action.payload.accessCode;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.fulfilled, (state, action) => {
                const properties = [];
                for (const propertyKey in action.payload) {
                    const property = {
                        ...action.payload[propertyKey],
                        firebaseId: propertyKey,
                    };
                    properties.push(property);
                }
                state.properties = properties;
            })
            .addCase(updateAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.actionCompleted = true;
                state.properties.push(action.payload);
                state.newProperty = {};
                state.newTenant = {};
                state.accessCode = "";
            })
            .addCase(updateJuzgoManaged.fulfilled, (state, action) => {
                const updateIndex = state.properties.findIndex(
                    (property) =>
                        property.firebaseId === action.payload.firebaseId
                );
                state.properties[updateIndex].juzgoManaged =
                    action.payload.juzgoManaged;
            })
            .addCase(updatePropertyAPI.fulfilled, (state, action) => {
                const updateIndex = state.properties.findIndex(
                    (property) =>
                        property.firebaseId === action.payload.firebaseId
                );
                state.properties[updateIndex] = action.payload;
                state.actionCompleted = true;
            });
    },
});

export const fetchProperties = createAsyncThunk(
    "propertySlice/fetchProperties",
    async (args, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const idToken = state.sessionSlice.idToken;

            const response = await fetch(
                firebase_database_url + "/property.json?auth=" + idToken,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await response.json();
            if (result.error) {
                throw new Error(result.error.message);
            }
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const updateAPI = createAsyncThunk(
    "propertySlice/updateAPI",
    async (arg, { getState }) => {
        try {
            // 1. add tenant
            const state = getState();
            const idToken = state.sessionSlice.idToken;

            const landlordId = state.sessionSlice.landlordId;
            let newInfo = {
                ...state.propertySlice.newTenant,
                landlord: landlordId,
                accessCode: state.propertySlice.accessCode,
            };
            const responseTenant = await fetch(
                firebase_database_url + "/tenant.json?auth=" + idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            const resultTenant = await responseTenant.json();

            if (resultTenant.error) {
                throw new Error(resultTenant.error);
            }

            // 2. add property belonging to this landlord and tenant
            newInfo = {
                ...state.propertySlice.newProperty,
                landlord: landlordId,
                tenant: resultTenant.name,
                accessCode: state.propertySlice.accessCode,
            };
            const responseProperty = await fetch(
                firebase_database_url + "/property.json?auth=" + idToken,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newInfo),
                }
            );
            const resultProperty = await responseProperty.json();

            if (resultProperty.error) {
                throw new Error(resultProperty.error);
            }

            return newInfo;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
);

export const updateJuzgoManaged = createAsyncThunk(
    "propertySlice/updateJuzgoManaged",
    async ({ firebaseId, juzgoManaged }, { getState }) => {
        try {
            const state = getState();
            const idToken = state.sessionSlice.idToken;

            const responseProperty = await fetch(
                firebase_database_url +
                    `/property/${firebaseId}.json?auth=` +
                    idToken,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        juzgoManaged: juzgoManaged,
                    }),
                }
            );
            const resultProperty = await responseProperty.json();

            if (resultProperty.error) {
                throw new Error(resultProperty.error);
            }

            return {
                firebaseId,
                juzgoManaged,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const updatePropertyAPI = createAsyncThunk(
    "propertySlice/updatePropertyAPI",
    async ({ firebaseId, updatedPropertyInfo }, { getState }) => {
        try {
            const state = getState();
            const idToken = state.sessionSlice.idToken;

            const responseProperty = await fetch(
                firebase_database_url +
                    `/property/${firebaseId}/.json?auth=` +
                    idToken,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedPropertyInfo),
                }
            );
            const resultProperty = await responseProperty.json();

            if (resultProperty.error) {
                throw new Error(resultProperty.error);
            }

            return { ...updatedPropertyInfo, firebaseId };
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const addNewProperty = propertySlice.actions.addNewProperty;
export const addNewTenant = propertySlice.actions.addNewTenant;
export const addAccessCode = propertySlice.actions.addAccessCode;
export const toggleLoading = propertySlice.actions.toggleLoading;
export const unsetActionCompleted = propertySlice.actions.unsetActionCompleted;
export default propertySlice.reducer;
