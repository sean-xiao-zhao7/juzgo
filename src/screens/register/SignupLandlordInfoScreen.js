import { useDispatch, useSelector } from "react-redux";

// store
import { updateInfo } from "../../store/slices/landlordSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserInfoForm from "../../components/forms/UserInfoForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordInfoScreen = (props) => {
    const dispatch = useDispatch();

    const landlordInfo = useSelector(
        (state) => state.landlordSignupSlice.landlordInfo
    );

    const onSubmit = (landlordInfo) => {
        dispatch(updateInfo({ landlordInfo }));
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
            <UserInfoForm onSubmit={onSubmit} info={landlordInfo} />
            <TextSmall style={{ marginTop: 60 }}>Step 2 of 5</TextSmall>
        </ScreenContainer>
    );
};

export default SignupLandlordInfoScreen;
