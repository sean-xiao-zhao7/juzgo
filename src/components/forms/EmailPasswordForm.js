import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";

const EmailPasswordForm = (props) => {
    const [email, setEmail] = useState(props.email ? props.email : "");
    const [password, setPassword] = useState("");

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"Email (username)"}
                onChangeText={setEmail}
                value={username}
            />
            <CustomTextInput
                placeholder={"Password"}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <Button1
                text="Complete signup"
                onPress={() => {
                    props.onSubmit({
                        email,
                        password,
                    });
                }}
            />
        </View>
    );
};

export default EmailPasswordForm;
