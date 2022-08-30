import { useState } from "react";
import { View } from "react-native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextSmall from "../texts/TextSmall";
import { colors } from "../../styles/colors";

const TenantForm = (props) => {
    const [firstname, setFirstname] = useState(
        props.info.firstname ? props.info.firstname : ""
    );
    const [lastname, setLastname] = useState(
        props.info.lastname ? props.info.lastname : ""
    );
    const [email, setEmail] = useState(
        props.info.email ? props.info.email : ""
    );
    const [phone, setPhone] = useState(
        props.info.phone ? props.info.phone : ""
    );
    const [agree, checkAgree] = useState(props.info.firstname ? true : false);

    return (
        <View style={{ alignItems: "center" }}>
            <CustomTextInput
                placeholder={"Tenant First Name"}
                style={{ width: 300 }}
                onChangeText={setFirstname}
                value={firstname}
            />
            <CustomTextInput
                placeholder={"Tenant Last Name"}
                style={{ width: 300 }}
                onChangeText={setLastname}
                value={lastname}
            />
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Tenant Email"}
                    style={{ width: 146, marginRight: 5 }}
                    onChangeText={setEmail}
                    value={email}
                />
                <CustomTextInput
                    placeholder={"Tenant Phone Number"}
                    style={{ width: 152 }}
                    onChangeText={setPhone}
                    value={phone}
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
                    <Checkbox value={agree} onValueChange={checkAgree} />
                    <TextSmall
                        style={{
                            color: colors.secondaryTextColor,
                            marginLeft: 10,
                        }}
                    >
                        I understand that to fully utilize Juzgo services, the
                        tenant above also has to sign up. Tenant sign up process
                        will be advised in the next page.
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
                    style={{ width: 90, height: 70, marginRight: 10 }}
                />
                <Button1
                    text="Next Step"
                    onPress={() =>
                        props.onNext({
                            firstname,
                            lastname,
                            email,
                            phone,
                        })
                    }
                    style={{ width: 90, height: 70, marginRight: 10 }}
                />
                <Button1
                    text="Skip"
                    onPress={props.onSkip}
                    style={{ width: 90, height: 70 }}
                />
            </View>
        </View>
    );
};

export default TenantForm;
