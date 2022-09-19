import { StyleSheet, TextInput } from "react-native";
import { colors } from "../../styles/colors";

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

        backgroundColor: colors.textinputBackground,

        borderWidth: 1,
        borderColor: colors.textinputBorder,
        borderRadius: 10,

        fontSize: 12,
    },
});

export default CustomTextInput;
