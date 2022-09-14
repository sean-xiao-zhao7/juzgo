import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import TextRegular from "../texts/TextRegular";

const Button1 = (props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) =>
                pressed
                    ? [style.button1, props.style, { opacity: 0.5 }]
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
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 18,

        width: 250,

        backgroundColor: colors.primaryColor,

        borderRadius: 10,

        fontSize: 12,
        fontWeight: "bold",
        // textTransform: "uppercase",

        alignItems: "center",
        justifyContent: "center",
    },
});

export default Button1;
