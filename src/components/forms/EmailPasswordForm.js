import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";

// helpers
import {
    emptyVerify,
    emailPasswordVerify,
    passwordNotMatching,
} from "./helpers/verifyForm";
import { customAlert } from "./helpers/alert";

const EmailPasswordForm = (props) => {
    const [email, setEmail] = useState(props.email ? props.email : "");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"Email (username)"}
                onChangeText={setEmail}
                value={email}
            />
            <CustomTextInput
                placeholder={"Password"}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <CustomTextInput
                placeholder={"Enter password again"}
                onChangeText={setPasswordAgain}
                value={passwordAgain}
                secureTextEntry={true}
            />
            <Button1
                text="Complete signup"
                onPress={() => {
                    if (
                        emptyVerify([email, password]) &&
                        emailPasswordVerify(email, password)
                    ) {
                        if (!passwordNotMatching(password, passwordAgain)) {
                            customAlert("Passwords do not match.");
                        } else {
                            props.onSubmit({
                                email,
                                password,
                            });
                        }
                    } else {
                        customAlert("Email and/or password not valid.");
                    }
                }}
            />
        </View>
    );
};

export default EmailPasswordForm;
