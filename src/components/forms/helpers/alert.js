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

export const serverErrorAlert = () => {
    Alert.alert(
        "Server error",
        "Please try again later. We apologize for the inconvenience.",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            { text: "OK", onPress: () => {} },
        ]
    );
};
