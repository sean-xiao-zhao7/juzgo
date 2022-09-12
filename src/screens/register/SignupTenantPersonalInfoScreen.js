import { useDispatch, useSelector } from "react-redux";

// store
import { updateTenantInfo } from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";

const SignupTenantPersonalInfoScreen = (props) => {
    const dispatch = useDispatch();

    const tenantInfo = useSelector(
        (state) => state.tenantSignupSlice.tenantInfo
    );

    const onSubmit = (tenantInfo) => {
        dispatch(updateTenantInfo({ tenantInfo }));
        props.navigation.navigate("SignupEmailPasswordScreen", {
            type: "tenant",
        });
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
            <UserInfoForm info={tenantInfo} onSubmit={onSubmit} />
        </ScreenContainer>
    );
};

export default SignupTenantPersonalInfoScreen;
