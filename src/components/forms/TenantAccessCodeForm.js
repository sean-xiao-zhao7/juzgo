import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";

const TenantAccessCodeForm = (props) => {
    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"XXX-XXX-XXXX"}
                style={{ width: 300 }}
            />
            <View style={{ width: 300 }}>
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
            <Button1 text="Next Step" onPress={props.onNext} />
        </View>
    );
};

export default TenantAccessCodeForm;
