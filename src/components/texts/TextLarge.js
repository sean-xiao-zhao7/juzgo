import { StyleSheet, Text } from "react-native";

const TextLarge = (props) => {
    return <Text style={[style.large, props.style]}>{props.children}</Text>;
};

const style = StyleSheet.create({
    large: {
        fontSize: 24,
    },
});

export default TextLarge;
