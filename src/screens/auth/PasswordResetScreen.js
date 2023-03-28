import { View } from "react-native";
import { Link } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// redux
import { initiateResetPasswordAction } from "../../store/slices/authSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextSmall from "../../components/texts/TextSmall";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";

// helpers
import { emptyVerify } from "../../components/forms/helpers/verifyForm";
import { customAlert } from "../../components/forms/helpers/alert";

const PasswordResetScreen = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");

    const error = useSelector((state) => state.authSlice.error);

    useEffect(() => {
        if (error) {
            customAlert(error);
        }
    }, [error]);

    const resetHandler = () => {
        if (emptyVerify([email])) {
            dispatch(initiateResetPasswordAction({ email }));
        } else {
            customAlert("Invalid email.");
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
                <Button1 text="Send reset email" onPress={resetHandler} />
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
