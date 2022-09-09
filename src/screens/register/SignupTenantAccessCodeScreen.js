import { useDispatch } from "react-redux";

// store
import { updateAccessCode } from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TenantAccessCodeForm from "../../components/forms/TenantAccessCodeForm";
import { useEffect } from "react";

const SignupTenantAccessCodeScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.navigate("SignupTenantPropertyLandlordScreen");
    }, []);

    const onNext = (accessCode) => {
        dispatch(updateAccessCode({ accessCode }));
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Tenant!
            </TextRegular>
            <TextRegular style={{ marginBottom: 100, width: 300 }}>
                Please enter the unique TENANT ACCESS CODE provided by your
                Landlord to proceed.
            </TextRegular>
            <TenantAccessCodeForm onNext={onNext} />
        </ScreenContainer>
    );
};

export default SignupTenantAccessCodeScreen;
