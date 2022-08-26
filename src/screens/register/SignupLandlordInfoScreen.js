// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordInfoScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular style={{ marginBottom: 60 }}>
                Please fill out the information below.
            </TextRegular>
            <UserInfoForm
                onSubmit={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 2 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupLandlordInfoScreen;
