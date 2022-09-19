import { StyleSheet, Text } from "react-native";

const TextMedium = (props) => {
    return <Text style={[style.large, props.style]}>{props.children}</Text>;
};

const style = StyleSheet.create({
    large: {
        fontSize: 16,
    },
});

export default TextMedium;
