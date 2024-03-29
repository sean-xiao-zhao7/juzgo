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
                onChangeText={setFirstname}
                value={firstname}
            />
            <CustomTextInput
                placeholder={"Tenant Last Name"}
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
                    style={{ width: 120, marginRight: 5 }}
                    onChangeText={setEmail}
                    value={email}
                />
                <CustomTextInput
                    placeholder={"Tenant Phone Number"}
                    style={{ width: 120 }}
                    onChangeText={setPhone}
                    value={phone}
                />
            </View>
            <View style={{ width: 250 }}>
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
                    text="Previous"
                    onPress={props.onPrevious}
                    style={{ width: 120, marginRight: 10 }}
                />
                <Button1
                    text="Next"
                    onPress={() => {
                        if (
                            emptyVerify([firstname, lastname, email, phone]) &&
                            agree
                        ) {
                            props.onNext({
                                firstname,
                                lastname,
                                email,
                                phone,
                            });
                        } else {
                            const emptyFields = {};
                            if (!firstname) {
                                emptyFields["First name"] = "Cannot be empty";
                            }
                            if (!lastname) {
                                emptyFields["Last name"] = "Cannot be empty";
                            }
                            if (!email) {
                                emptyFields["Email"] = "Cannot be empty";
                            }
                            if (!phone) {
                                emptyFields["Phone"] = "Cannot be empty";
                            }
                            if (!agree) {
                                emptyFields["Agree"] =
                                    "Must agree to tenant sign up.";
                            }
                            incompleteErrorAlert(emptyFields);
                        }
                    }}
                    style={{ width: 120 }}
                />
                {/* <Button1
                    text="Skip"
                    onPress={props.onSkip}
                    style={{ width: 80, height: 70 }}
                /> */}
            </View>
        </View>
    );
};

export default TenantForm;
