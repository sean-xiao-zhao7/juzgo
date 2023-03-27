import { View } from "react-native";
import { Link } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// redux
import { signInAction } from "../../store/slices/sessionSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import HeadingLarge from "../../components/headings/HeadingLarge";
import TextRegular from "../../components/texts/TextRegular";
import TextSmall from "../../components/texts/TextSmall";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";

// helpers
import {
    emptyVerify,
    emailPasswordVerify,
} from "../../components/forms/helpers/verifyForm";
import { customAlert } from "../../components/forms/helpers/alert";

const PasswordResetScreen = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const idToken = useSelector((state) => state.sessionSlice.idToken);
    const error = useSelector((state) => state.sessionSlice.error);

    useEffect(() => {
        if (idToken !== "") {
            props.navigation.navigate("AllPropertiesScreen");
        } else if (error) {
            customAlert(error);
        }
    }, [idToken, error]);

    const signInHandler = () => {
        if (
            emptyVerify([email, password]) &&
            emailPasswordVerify(email, password)
        ) {
            dispatch(signInAction({ email, password }));
        } else {
            customAlert("Invalid email/password.");
        }
    };

    return (
        <ScreenContainer>
            <TextRegular>Reset password</TextRegular>
            <View style={{ marginTop: 60 }}>
                <CustomTextInput
                    placeholder={"Email"}
                    value={email}
                    onChangeText={setEmail}
                />
                <Button1 text="Send reset email" onPress={signInHandler} />
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
                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <TextSmall>
                        Already have an account?{" "}
                        <Link
                            to={{ screen: "LoginScreen" }}
                            style={{ color: "blue" }}
                        >
                            Log in instead.
                        </Link>
                    </TextSmall>
                </View>
            </View>
        </ScreenContainer>
    );
};

export default PasswordResetScreen;
