import { useState } from "react";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";
import TextSmall from "../../components/texts/TextSmall";
import { colors } from "../../styles/colors";

const UserInfoForm = (props) => {
    const [firstname, setFirstname] = useState(
        props.info.firstname ? props.info.firstname : ""
    );
    const [lastname, setLastname] = useState(
        props.info.firstname ? props.info.lastname : ""
    );
    const [email, setEmail] = useState(
        props.info.firstname ? props.info.email : ""
    );
    const [phone, setPhone] = useState(
        props.info.firstname ? props.info.phone : ""
    );
    const [terms, checkTerms] = useState(props.info.firstname ? true : false);
    const [authorize, checkAuthorize] = useState(
        props.info.firstname ? true : false
    );

    return (
        <View style={{ alignItems: "center" }}>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"First Name"}
                    style={{ width: 120, marginRight: 10 }}
                    onChangeText={setFirstname}
                    value={firstname}
                />
                <CustomTextInput
                    placeholder={"Last Name"}
                    style={{ width: 120 }}
                    onChangeText={setLastname}
                    value={lastname}
                />
            </View>
            <CustomTextInput
                placeholder={"Email"}
                onChangeText={setEmail}
                value={email}
            />
            <CustomTextInput
                placeholder={"Phone Number"}
                onChangeText={setPhone}
                value={phone}
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
            {props.buttons ? (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    {props.buttons.map((button) => button)}
                </View>
            ) : (
                <Button1
                    text="Next Step"
                    onPress={() => {
                        if (authorize && terms) {
                            props.onSubmit({
                                firstname,
                                lastname,
                                email,
                                phone,
                            });
                        }
                    }}
                    disabled={!(authorize && terms)}
                />
            )}
        </View>
    );
};

export default UserInfoForm;
