import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";

// form
import { incompleteErrorAlert } from "./helpers/alert";
import { emptyVerify } from "./helpers/verifyForm";

const TenantAccessCodeForm = (props) => {
    const [accessCode, setAccessCode] = useState("");

    const transformAccessCode = () => {
        let newCode = "";
        const found = accessCode.match(/^\d{3}-\d{3}-\d{4}$/g);
        if (found) {
            return accessCode;
        } else {
            newCode =
                accessCode.slice(0, 3) +
                "-" +
                accessCode.slice(3, 6) +
                "-" +
                accessCode.slice(6, 10);
            return newCode;
        }
    };

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"XXXXXXXXXX or XXX-XXX-XXXX"}
                value={accessCode}
                onChangeText={setAccessCode}
                style={{ textAlign: "center" }}
                keyboardType={"numeric"}
            />
            <Button1
                text="Next Step"
                onPress={() => {
                    if (emptyVerify([accessCode])) {
                        props.onNext(transformAccessCode(accessCode));
                    } else {
                        incompleteErrorAlert();
                    }
                }}
            />
        </View>
    );
};

export default TenantAccessCodeForm;
