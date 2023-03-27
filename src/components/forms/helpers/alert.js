import { Alert } from "react-native";

export const incompleteErrorAlert = (fields = {}) => {
    if (fields === {}) {
        Alert.alert("Incomplete info", "Please complete all info.", [
            { text: "OK", onPress: () => {} },
        ]);
    } else {
        let fieldsInfo = "";
        for (const key in fields) {
            fieldsInfo += `${key} - ${fields[key]}\n`;
        }
        Alert.alert("Incomplete info", fieldsInfo, [
            { text: "OK", onPress: () => {} },
        ]);
    }
};

export const serverErrorAlert = () => {
    Alert.alert(
        "Server error",
        "Please try again later. We apologize for the inconvenience.",
        [{ text: "OK", onPress: () => {} }]
    );
};

export const customAlert = (message) => {
    Alert.alert("Error", message, [{ text: "OK", onPress: () => {} }]);
};
