import { Text } from "react-native";

const TextRegular = (props) => {
    return <Text style={props.style}>{props.children}</Text>;
};

export default TextRegular;
