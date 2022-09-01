import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// store
import { signUp, signUpAPI } from "../../store/slices/sessionSlice";
import { updateLandlordDB } from "../../store/slices/landlordSignupSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import EmailPasswordForm from "../../components/forms/EmailPasswordForm";

const SignupEmailPasswordScreen = (props) => {
    const dispatch = useDispatch();
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (complete) {
            props.navigation.navigate("AllPropertiesScreen");
        }
    }, [complete]);

    const info = useSelector((state) => {
        const info = { type: props.route.params.type };
        if (info.type === "landlord") {
            info.personalInfo = state.landlordSignupSlice.landlordInfo;
            info.landlordPropertyInfo =
                state.landlordSignupSlice.landlordPropertyInfo;
            info.landlordTenantInfo =
                state.landlordSignupSlice.landlordTenantInfo;
        } else if (info.type === "tenant") {
            // build tenant info
        }
        return info;
    });

    const email = useSelector((state) => state.sessionSlice.email);
    const completeVal = useSelector(
        (state) => state.landlordSignupSlice.complete
    );

    const onSubmit = (emailPassword) => {
        dispatch(signUp({ info, emailPassword }));
        dispatch(signUpAPI(emailPassword));
        dispatch(updateLandlordDB(info));
        setComplete(completeVal);
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
