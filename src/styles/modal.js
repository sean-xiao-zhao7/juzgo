import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const modalStyle = StyleSheet.create({
    modal: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.tertiaryColor,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
        width: "90%",
    },
});
