// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextSmall from "../../components/texts/TextSmall";
import Button1 from "../../components/buttons/Button1";

const SignupChoiceScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular>What type of account are you</TextRegular>
            <TextRegular>looking to sign up?</TextRegular>
            <Button1
                text="Landlord"
                style={{ marginTop: 60 }}
                onPress={() => {
                    props.navigation.navigate("SignupLandlordInfoScreen");
                }}
            />
            <Button1
                text="Tenant"
                onPress={() => {
                    props.navigation.navigate("SignupTenantAccessCodeScreen");
                }}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 1 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupChoiceScreen;
