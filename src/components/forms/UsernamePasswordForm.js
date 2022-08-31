import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";

const UsernamePasswordForm = (props) => {
    const [username, setUsername] = useState(
        props.username ? props.username : ""
    );
    const [password, setPassword] = useState("");

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"Username"}
                onChangeText={setUsername}
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
                        username,
                        password,
                    });
                }}
            />
        </View>
    );
};

export default UsernamePasswordForm;
