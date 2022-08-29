// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TenantForm from "../../components/forms/TenantForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordTenantScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please fill out the information below for the{" "}
                <TextRegular style={{ fontWeight: "bold" }}>tenant</TextRegular>{" "}
                in the unit of the property you just filled out.
            </TextRegular>

            <TenantForm
                onPrevious={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
                onNext={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
                onSkip={() => {
                    props.navigation.navigate("AllPropertiesScreen");
                }}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 3 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupLandlordTenantScreen;
