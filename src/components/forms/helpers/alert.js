import { Alert } from "react-native";

export const incompleteErrorAlert = () => {
    Alert.alert("Incomplete info", "Please complete all info.", [
        {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
        },
        { text: "OK", onPress: () => {} },
    ]);
};
