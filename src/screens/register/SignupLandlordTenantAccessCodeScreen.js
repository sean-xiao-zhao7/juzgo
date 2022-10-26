import { useDispatch } from "react-redux";

// redux
import { updateAccessCode } from "../../store/slices/landlordSignupSlice";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import LandlordAccessCodeForm from "../../components/forms/LandlordAccessCodeForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordTenantAccessCodeScreen = (props) => {
    const dispatch = useDispatch();

    const onNext = (accessCode) => {
        dispatch(updateAccessCode({ accessCode }));
        props.navigation.navigate("SignupEmailPasswordScreen", {
            type: "landlord",
        });
    };

    return (
        <ScreenScrollContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please{" "}
                <TextRegular style={{ fontWeight: "bold" }}>
                    give the unique TENANT ACCESS CODE below to your current or
                    future tenant to sign up with Juzgo.
                </TextRegular>
                This code is necessary to link your tenant profile to the
                property. This allows Juzgo and your tenant to communicate
                directly while you are away.
            </TextRegular>

            <LandlordAccessCodeForm
                onPrevious={() => {
                    props.navigation.navigate("SignupLandlordTenantScreen");
                }}
                onNext={onNext}
            />
            <TextSmall style={{ marginTop: 30 }}>Step 5 of 5</TextSmall>
        </ScreenScrollContainer>
    );
};

export default SignupLandlordTenantAccessCodeScreen;
