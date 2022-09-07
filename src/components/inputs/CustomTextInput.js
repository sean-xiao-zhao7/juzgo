import { StyleSheet, TextInput } from "react-native";

const CustomTextInput = (props) => {
    return (
        <TextInput
            {...props}
            style={[style.input, props.style]}
            autoCapitalize={"none"}
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
