import { useDispatch, useSelector } from "react-redux";

// store
import { updateInfo } from "../../store/slices/landlordSignupSlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import UserInfoForm from "../../components/forms/UserInfoForm";
import TextSmall from "../../components/texts/TextSmall";
import Button2 from "../../components/buttons/Button2";

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
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20, marginTop: 50 }}>
                Welcome, Landlord!
            </TextLarge>
            <TextRegular style={{ marginBottom: 40 }}>
                Please fill out the information below.
            </TextRegular>
            <UserInfoForm onSubmit={onSubmit} info={landlordInfo} />
            <TextSmall style={{ marginVertical: 60 }}>Step 2 of 5</TextSmall>
            <Button2
                text="Back"
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </ScreenScrollContainer>
    );
};

export default SignupLandlordInfoScreen;
