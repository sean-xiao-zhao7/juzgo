import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";

// form
import { incompleteErrorAlert } from "./helpers/alert";
import { emptyVerify } from "./helpers/verifyForm";

const TenantAccessCodeForm = (props) => {
    const [accessCode, setAccessCode] = useState("");

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"XXX-XXX-XXXX"}
                value={accessCode}
                onChangeText={setAccessCode}
            />
            <View style={{ width: 250 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 40,
                    }}
                >
                    <TextSmall>This code is necessary to proceed.</TextSmall>
                </View>
            </View>
            <Button1
                text="Next Step"
                onPress={() => {
                    if (emptyVerify([accessCode])) {
                        props.onNext(accessCode);
                    } else {
                        incompleteErrorAlert();
                    }
                }}
            />
        </View>
    );
};

export default TenantAccessCodeForm;
