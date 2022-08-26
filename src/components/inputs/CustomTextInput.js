import { StyleSheet, TextInput, View } from "react-native";

// comps
// import TextRegular from "../texts/TextRegular";

const CustomTextInput = (props) => {
    return (
        <TextInput
            {...props.config}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            style={[style.input, props.style]}
        />
    );
};

const style = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 18,

        width: 250,

        backgroundColor: "rgba(0,0,0,0.05)",

        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        borderRadius: 10,

        fontSize: 12,
    },
});

export default CustomTextInput;
