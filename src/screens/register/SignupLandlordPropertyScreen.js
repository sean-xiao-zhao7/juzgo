// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserPropertyForm from "../../components/forms/UserPropertyForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordPropertyScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please fill out the information below for the property unit that
                you like Juzgo to help you manage. Each form is designated for
                one unit. You can register for more units later.
            </TextRegular>

            <UserPropertyForm
                onPrevious={() => {
                    props.navigation.navigate("SignupLandlordInfoScreen");
                }}
                onNext={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 3 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupLandlordPropertyScreen;
