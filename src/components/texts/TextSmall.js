import { StyleSheet, Text } from "react-native";

const TextSmall = (props) => {
    return <Text style={style.text}>{props.children}</Text>;
};

const style = StyleSheet.create({
    text: {
        fontSize: 12,
    },
});

export default TextSmall;
