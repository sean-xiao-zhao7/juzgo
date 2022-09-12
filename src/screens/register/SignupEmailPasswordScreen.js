import { useDispatch, useSelector } from "react-redux";

// store
import { updateLandlordDB } from "../../store/slices/landlordSignupSlice";
import { updateTenantDB } from "../../store/slices/tenantSignupSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import EmailPasswordForm from "../../components/forms/EmailPasswordForm";
import { useEffect } from "react";

const SignupEmailPasswordScreen = (props) => {
    const dispatch = useDispatch();

    const info = useSelector((state) => {
        const info = { type: props.route.params.type };
        if (info.type === "landlord") {
            info.personalInfo = state.landlordSignupSlice.landlordInfo;
            info.landlordPropertyInfo =
                state.landlordSignupSlice.landlordPropertyInfo;
            info.landlordTenantInfo =
                state.landlordSignupSlice.landlordTenantInfo;
        }
        return info;
    });

    let completeVal;
    const email = useSelector((state) => state.sessionSlice.email);
    if (info.type === "landlord") {
        completeVal = useSelector(
            (state) => state.landlordSignupSlice.complete
        );
    } else {
        completeVal = useSelector((state) => state.tenantSignupSlice.complete);
    }

    useEffect(() => {
        if (completeVal === true) {
            props.navigation.navigate("AllPropertiesScreen");
        }
    }, [completeVal]);

    const onSubmit = (emailPassword) => {
        if (info.type === "landlord") {
            dispatch(updateLandlordDB({ info, emailPassword }));
        } else {
            console.log("dispatch");
            dispatch(updateTenantDB(emailPassword));
        }
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Thanks for signing up!
            </TextRegular>
            <TextRegular style={{ marginBottom: 60 }}>
                Please enter your new username and password for login.
            </TextRegular>
            <EmailPasswordForm onSubmit={onSubmit} email={email} />
        </ScreenContainer>
    );
};

export default SignupEmailPasswordScreen;
