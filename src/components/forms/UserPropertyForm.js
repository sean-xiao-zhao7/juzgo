import { View, CheckBox } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";
import { colors } from "../../styles/colors";

const UserPropertyForm = (props) => {
    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"Unit # (e.g. 123, main floor, basement, etc)"}
                style={{ width: 300 }}
            />
            <CustomTextInput
                placeholder={"Unit street number and name"}
                style={{ width: 300 }}
            />
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Unit City/Town"}
                    style={{ width: 140, marginRight: 20 }}
                />
                <CustomTextInput
                    placeholder={"Unit Province"}
                    style={{ width: 140 }}
                />
            </View>
            <View style={{ width: 300 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <CheckBox />
                    <TextSmall
                        style={{
                            color: colors.secondaryTextColor,
                            marginLeft: 10,
                        }}
                    >
                        I certify that I either own or have legal authorization
                        to make decisions on this unit.
                    </TextSmall>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Button1
                    text="Previous Step"
                    onPress={props.onPrevious}
                    style={{ width: 140, marginRight: 20 }}
                />
                <Button1
                    text="Next Step"
                    onPress={props.onNext}
                    style={{ width: 140 }}
                />
            </View>
        </View>
    );
};

export default UserPropertyForm;
