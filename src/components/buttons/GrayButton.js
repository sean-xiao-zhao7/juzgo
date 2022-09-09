import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import TextRegular from "../texts/TextRegular";

const GrayButton = (props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) =>
                pressed
                    ? [style.button1, props.style, { opacity: 0.7 }]
                    : [style.button1, props.style]
            }
            disabled={props.disabled}
        >
            <TextRegular>{props.text}</TextRegular>
        </Pressable>
    );
};

const style = StyleSheet.create({
    button1: {
        backgroundColor: colors.grayBackground,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default GrayButton;
