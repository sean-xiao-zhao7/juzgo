import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const modalStyle = StyleSheet.create({
    modal: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.tertiaryColor,
        borderRadius: 20,
        padding: 20,
        paddingBottom: 10,
        width: "90%",
    },
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
});
