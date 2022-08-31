import { useDispatch, useSelector } from "react-redux";

// store
import { signUp } from "../../store/slices/sessionSlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UsernamePasswordForm from "../../components/forms/UsernamePasswordForm";

const SignupEmailPasswordScreen = (props) => {
    const dispatch = useDispatch();

    const landlordInfo = useSelector((state) => {
        const info = {};
        info.personalInfo = state.landlordSignupSlice.landlordInfo;
        info.landlordPropertyInfo =
            state.landlordSignupSlice.landlordPropertyInfo;
        info.landlordTenantInfo = state.landlordSignupSlice.landlordTenantInfo;
        return info;
    });

    const username = useSelector((state) => state.sessionSlice.username);

    const onSubmit = (usernamePassword) => {
        landlordInfo.type = "landlord";
        dispatch(signUp({ landlordInfo, usernamePassword }));
        props.navigation.navigate("AllPropertiesScreen");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Thanks for signing up!
            </TextRegular>
            <TextRegular style={{ marginBottom: 60 }}>
                Please enter your new username and password for login.
            </TextRegular>
            <UsernamePasswordForm onSubmit={onSubmit} username={username} />
        </ScreenContainer>
    );
};

export default SignupEmailPasswordScreen;
