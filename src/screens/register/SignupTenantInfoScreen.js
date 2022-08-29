// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import PropertyAndLandlordForm from "../../components/forms/PropertyAndLandlordForm";

const SignupTenantInfoScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Property and Tenant{" "}
                <TextRegular
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                    Info
                </TextRegular>
            </TextRegular>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                Please confirm all information below are correct. If there is
                anything incorrect, please advise the Landlord to change before
                proceeding.
            </TextRegular>
            <PropertyAndLandlordForm
                onNext={() => {
                    props.navigation.navigate("SignupTenantInfoScreen");
                }}
            />
        </ScreenContainer>
    );
};

export default SignupTenantInfoScreen;
