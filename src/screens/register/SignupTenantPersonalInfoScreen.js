// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";
import Button1 from "../../components/buttons/Button1";

const SignupTenantPersonalInfoScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Tenant!
            </TextRegular>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                Please confirm all information below are correct. If there is
                anything incorrect, please advise the Landlord to change before
                proceeding.
            </TextRegular>
            <UserInfoForm
                buttons={[
                    <Button1
                        text="Edit"
                        onPress={() => {}}
                        style={{ width: 120, marginRight: 10 }}
                    />,
                    <Button1
                        text="Submit"
                        onPress={() =>
                            props.navigation.navigate("AllPropertiesScreen")
                        }
                        style={{ width: 120, marginRight: 10 }}
                    />,
                ]}
            />
        </ScreenContainer>
    );
};

export default SignupTenantPersonalInfoScreen;
