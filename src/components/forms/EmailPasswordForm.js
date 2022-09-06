import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";

// helpers
import { emptyVerify, emailPasswordVerify } from "./helpers/verifyForm";
import { incompleteErrorAlert } from "./helpers/alert";

const EmailPasswordForm = (props) => {
    const [email, setEmail] = useState(props.email ? props.email : "");
    const [password, setPassword] = useState("");

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
            <Button1
                text="Complete signup"
                onPress={() => {
                    if (
                        emptyVerify([email, password]) &&
                        emailPasswordVerify(email, password)
                    ) {
                        props.onSubmit({
                            email,
                            password,
                        });
                    } else {
                        incompleteErrorAlert();
                    }
                }}
            />
        </View>
    );
};

export default EmailPasswordForm;
