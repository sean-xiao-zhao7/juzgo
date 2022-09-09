import { StyleSheet } from "react-native";

// colors
import { colors } from "./colors";

export const screenContainerStyles = StyleSheet.create({
    style: {
        // spacing
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

        // color
        backgroundColor: colors.secondaryColor,
    },
});
