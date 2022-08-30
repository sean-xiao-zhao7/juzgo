import { useState } from "react";
import { View } from "react-native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";
import { colors } from "../../styles/colors";

const UserPropertyForm = (props) => {
    const [unitNum, setUnitNum] = useState(
        props.info.unitnum ? props.info.unitnum : ""
    );
    const [street, setStreet] = useState(
        props.info.street ? props.info.street : ""
    );
    const [city, setCity] = useState(props.info.city ? props.info.city : "");
    const [province, setProvince] = useState(
        props.info.province ? props.info.province : ""
    );
    const [authorize, checkAuthorize] = useState(
        props.info.firstname ? true : false
    );

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                value={unitNum}
                onChangeText={setUnitNum}
                placeholder={"Unit # (e.g. 123, main floor, basement, etc)"}
                style={{ width: 300 }}
            />
            <CustomTextInput
                value={street}
                onChangeText={setStreet}
                placeholder={"Unit street number and name"}
                style={{ width: 300 }}
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
                    style={{ width: 140, marginRight: 20 }}
                />
                <CustomTextInput
                    value={province}
                    onChangeText={setProvince}
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
                    text="Previous Step"
                    onPress={props.onPrevious}
                    style={{ width: 140, marginRight: 20 }}
                />
                <Button1
                    text="Next Step"
                    onPress={() =>
                        props.onNext({
                            unitNum,
                            street,
                            city,
                            province,
                        })
                    }
                    style={{ width: 140 }}
                />
            </View>
        </View>
    );
};

export default UserPropertyForm;
