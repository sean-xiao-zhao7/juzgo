import { useDispatch, useSelector } from "react-redux";

// store
import { updateInfo } from "../../store/slices/userSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordInfoScreen = (props) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(
        (state) => state.userSignupSliceReducer.userInfo
    );

    const onSubmit = (userInfo) => {
        dispatch(updateInfo({ userInfo }));
        props.navigation.navigate("SignupLandlordPropertyScreen");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular style={{ marginBottom: 60 }}>
                Please fill out the information below.
            </TextRegular>
            <UserInfoForm onSubmit={onSubmit} info={userInfo} />
            <TextSmall style={{ marginTop: 60 }}>Step 2 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupLandlordInfoScreen;
