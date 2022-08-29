// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TenantAccessCodeForm from "../../components/forms/TenantAccessCodeForm";

const SignupTenantAccessCodeScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Tenant!
            </TextRegular>
            <TextRegular style={{ marginBottom: 100, width: 300 }}>
                Please enter the unique TENANT ACCESS CODE provided by your
                Landlord to proceed.
            </TextRegular>
            <TenantAccessCodeForm
                onNext={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
            />
        </ScreenContainer>
    );
};

export default SignupTenantAccessCodeScreen;
