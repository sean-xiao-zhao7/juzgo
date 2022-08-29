import { View } from "react-native";
import { Link } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";
import TextSmall from "../../components/texts/TextSmall";
import { colors } from "../../styles/colors";

const UserInfoForm = (props) => {
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
                />
                <CustomTextInput
                    placeholder={"Last Name"}
                    style={{ width: 120 }}
                />
            </View>
            <CustomTextInput placeholder={"Email"} />
            <CustomTextInput placeholder={"Phone Number"} />
            <View style={{ width: 250 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Checkbox />
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
                    <Checkbox />
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
                <Button1 text="Next Step" onPress={props.onSubmit} />
            )}
        </View>
    );
};

export default UserInfoForm;
