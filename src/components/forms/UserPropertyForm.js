import { useState } from "react";
import { View } from "react-native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";
import { colors } from "../../styles/colors";
import { emptyVerify } from "./helpers/verifyForm";
import { incompleteErrorAlert } from "./helpers/alert";

const UserPropertyForm = (props) => {
    const [unitnum, setUnitNum] = useState(
        props.info?.unitnum ? props.info?.unitnum : ""
    );
    const [street, setStreet] = useState(
        props.info?.street ? props.info?.street : ""
    );
    const [city, setCity] = useState(props.info?.city ? props.info?.city : "");
    const [province, setProvince] = useState(
        props.info?.province ? props.info?.province : ""
    );
    const [country, setCountry] = useState(
        props.info?.country ? props.info?.country : ""
    );
    const [authorize, checkAuthorize] = useState(
        props.info?.unitnum ? true : false
    );

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                value={unitnum}
                onChangeText={setUnitNum}
                placeholder={"Unit # (e.g. 123, main floor, basement, etc)"}
            />
            <CustomTextInput
                value={street}
                onChangeText={setStreet}
                placeholder={"Unit street number and name"}
            />
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    value={city}
                    onChangeText={setCity}
                    placeholder={"Unit City/Town"}
                    style={{ width: 120, marginRight: 10 }}
                />
                <CustomTextInput
                    value={province}
                    onChangeText={setProvince}
                    placeholder={"Unit Province"}
                    style={{ width: 120 }}
                />
            </View>
            <CustomTextInput
                value={country}
                onChangeText={setCountry}
                placeholder={"Unit country"}
            />
            <View style={{ width: 250 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Checkbox
                        value={authorize}
                        onValueChange={checkAuthorize}
                    />
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
                    text={
                        props.previousStepText
                            ? props.previousStepText
                            : "Previous Step"
                    }
                    onPress={props.onPrevious}
                    style={{ width: 120, marginRight: 10 }}
                />
                <Button1
                    text={props.nextStepText ? props.nextStepText : "Next Step"}
                    onPress={() => {
                        if (
                            emptyVerify([
                                unitnum,
                                street,
                                city,
                                province,
                                country,
                            ]) &&
                            authorize
                        ) {
                            props.onNext({
                                unitnum,
                                street,
                                city,
                                province,
                                country,
                            });
                        } else {
                            incompleteErrorAlert();
                        }
                    }}
                    style={{ width: 120 }}
                />
            </View>
        </View>
    );
};

export default UserPropertyForm;
