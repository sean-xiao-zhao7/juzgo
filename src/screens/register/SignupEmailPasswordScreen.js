import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// store
import { updateLandlordDB } from "../../store/slices/landlordSignupSlice";
import { updateTenantDB } from "../../store/slices/tenantSignupSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import EmailPasswordForm from "../../components/forms/EmailPasswordForm";

// alerts
import { customAlert } from "../../components/forms/helpers/alert";

const SignupEmailPasswordScreen = (props) => {
    const dispatch = useDispatch();

    const [info, signupError] = useSelector((state) => {
        const info = { type: props.route.params.type };
        if (info.type === "landlord") {
            info.personalInfo = state.landlordSignupSlice.landlordInfo;
            info.landlordPropertyInfo =
                state.landlordSignupSlice.landlordPropertyInfo;
            info.landlordTenantInfo =
                state.landlordSignupSlice.landlordTenantInfo;
        }

        const signupError = state.landlordSignupSlice.error;

        return [info, signupError];
    });

    let completeVal;
    let email = useSelector((state) => state.sessionSlice.email);
    if (info.type === "landlord") {
        completeVal = useSelector(
            (state) => state.landlordSignupSlice.complete
        );
    } else {
        completeVal = useSelector((state) => state.tenantSignupSlice.complete);
    }

    if (!email) {
        email = info.personalInfo.email;
    }

    useEffect(() => {
        if (completeVal === true) {
            props.navigation.navigate("AllPropertiesScreen");
        }
    }, [completeVal, signupError]);

    const onSubmit = (emailPassword) => {
        if (signupError) {
            customAlert(signupError);
        }
        if (info.type === "landlord") {
            dispatch(updateLandlordDB({ info, emailPassword }));
        } else {
            dispatch(updateTenantDB(emailPassword));
        }
    };

    return (
        <ScreenContainer>
            <TextLarge style={{ marginBottom: 20 }}>
                New Account Login Info
            </TextLarge>
            <TextRegular style={{ marginBottom: 20, width: 300 }}>
                Thanks for signing up! This is the last step. Please provide a
                new username and password for login.
            </TextRegular>
            <EmailPasswordForm onSubmit={onSubmit} email={email} />
        </ScreenContainer>
    );
};

export default SignupEmailPasswordScreen;
