import { View } from "react-native";
import { Link } from "@react-navigation/native";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import HeadingLarge from "../../components/headings/HeadingLarge";
import TextRegular from "../../components/texts/TextRegular";
import TextSmall from "../../components/texts/TextSmall";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";

const LoginScreen = (props) => {
    return (
        <ScreenContainer>
            <HeadingLarge>JUZGO</HeadingLarge>
            <TextRegular>Unleash Your Freedom</TextRegular>
            <View style={{ marginTop: 60 }}>
                <CustomTextInput label={"Email"} />
                <CustomTextInput label={"Password"} />
                <Button1 text="Log in" />
                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <TextSmall>
                        Don't have an account?{" "}
                        <Link
                            to={{ screen: "SignUpChoiceScreen" }}
                            style={{ color: "blue" }}
                        >
                            Sign up
                        </Link>
                    </TextSmall>
                </View>
            </View>
        </ScreenContainer>
    );
};

export default LoginScreen;
