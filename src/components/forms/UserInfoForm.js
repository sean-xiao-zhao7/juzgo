import { useState } from "react";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";
import TextSmall from "../../components/texts/TextSmall";
import { colors } from "../../styles/colors";
import { incompleteErrorAlert } from "./helpers/alert";
import { emptyVerify } from "./helpers/verifyForm";

const UserInfoForm = (props) => {
    const [firstname, setFirstname] = useState(
        props.info?.firstname ? props.info.firstname : ""
    );
    const [lastname, setLastname] = useState(
        props.info?.firstname ? props.info.lastname : ""
    );
    const [email, setEmail] = useState(
        props.info?.firstname ? props.info.email : ""
    );
    const [phone, setPhone] = useState(
        props.info?.firstname ? props.info.phone : ""
    );
    const [terms, checkTerms] = useState(props.info?.firstname ? true : false);
    const [authorize, checkAuthorize] = useState(
        props.info?.firstname ? true : false
    );

    return (
        <View
            style={{
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "80%",
                }}
            >
                <CustomTextInput
                    placeholder={"First Name"}
                    style={{ width: "50%", marginRight: 10 }}
                    onChangeText={setFirstname}
                    value={firstname}
                />
                <CustomTextInput
                    placeholder={"Last Name"}
                    onChangeText={setLastname}
                    value={lastname}
                    style={{ flex: 1 }}
                />
            </View>
            <CustomTextInput
                placeholder={"Email"}
                onChangeText={setEmail}
                value={email}
                style={{ width: "80%" }}
            />
            <CustomTextInput
                placeholder={"Phone Number"}
                onChangeText={setPhone}
                value={phone}
                style={{ width: "80%" }}
            />
            <View style={{ width: 250 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Checkbox value={terms} onValueChange={checkTerms} />
                    <TextSmall
                        style={{
                            color: colors.secondaryTextColor,
                            marginLeft: 10,
                        }}
                    >
                        By signing up, I agree to Juzgo's{" "}
                        <Link to={{}} style={{ color: colors.linkColor }}>
                            Term
                        </Link>
                        ,{" "}
                        <Link to={{}} style={{ color: colors.linkColor }}>
                            Data Policy
                        </Link>{" "}
                        and{" "}
                        <Link to={{}} style={{ color: colors.linkColor }}>
                            Cookies Policy
                        </Link>
                        .
                    </TextSmall>
                </View>
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
                        In order to properly use all services, I authorize
                        Juzgo.com to email, text, and/or call me.
                    </TextSmall>
                </View>
            </View>
            <Button1
                text={props.nextStepText ? props.nextStepText : "Next Step"}
                onPress={() => {
                    if (
                        emptyVerify([
                            email,
                            firstname,
                            lastname,
                            email,
                            phone,
                        ]) &&
                        terms &&
                        authorize
                    ) {
                        props.onSubmit({
                            firstname,
                            lastname,
                            email,
                            phone,
                        });
                    } else {
                        const emptyFields = {};
                        if (!email) {
                            emptyFields["Email"] = "Cannot be empty";
                        }
                        if (!firstname) {
                            emptyFields["First name"] = "Cannot be empty";
                        }
                        if (!lastname) {
                            emptyFields["Last name"] = "Cannot be empty";
                        }
                        if (!phone) {
                            emptyFields["Phone"] = "Cannot be empty";
                        }
                        if (!terms) {
                            emptyFields["Terms"] = "Must be agreed to.";
                        }
                        if (!authorize) {
                            emptyFields["Authorize"] = "Must authorize Juzgo.";
                        }
                        incompleteErrorAlert(emptyFields);
                    }
                }}
            />
            <Button1 text="Back" onPress={props.onPrevious} />
        </View>
    );
};

export default UserInfoForm;
