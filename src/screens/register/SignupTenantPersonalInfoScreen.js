import { useDispatch, useSelector } from "react-redux";

// store
import { updatePersonalInfo } from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";

const SignupTenantPersonalInfoScreen = (props) => {
    const dispatch = useDispatch();

    const personalInfo = useSelector(
        (state) => state.tenantSignupSlice.personalInfo
    );

    const onSubmit = (personalInfo) => {
        dispatch(updatePersonalInfo(personalInfo));
        props.navigation.navigate("AllPropertiesScreen");
    };

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
            <UserInfoForm info={personalInfo} onSubmit={onSubmit} />
        </ScreenContainer>
    );
};

export default SignupTenantPersonalInfoScreen;
