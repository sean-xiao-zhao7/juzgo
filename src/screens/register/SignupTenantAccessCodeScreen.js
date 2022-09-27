import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// store
import { verifyAccessCode } from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TenantAccessCodeForm from "../../components/forms/TenantAccessCodeForm";
import Button1 from "../../components/buttons/Button1";
import { customAlert } from "../../components/forms/helpers/alert.js";

const SignupTenantAccessCodeScreen = (props) => {
    const dispatch = useDispatch();

    const accessCode = useSelector(
        (state) => state.tenantSignupSlice.accessCode
    );
    const error = useSelector((state) => state.tenantSignupSlice.error);

    useEffect(() => {
        if (accessCode !== "") {
            props.navigation.navigate("SignupTenantPropertyLandlordScreen");
        }
        if (error !== "") {
            customAlert(error);
        }
    }, [accessCode, error]);

    const onNext = (accessCode) => {
        dispatch(verifyAccessCode(accessCode));
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
            <Button1
                text="Back"
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </ScreenContainer>
    );
};

export default SignupTenantAccessCodeScreen;
