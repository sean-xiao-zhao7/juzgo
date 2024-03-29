import { useDispatch, useSelector } from "react-redux";

// store
import { updateLandlordPropertyInfo } from "../../store/slices/landlordSignupSlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import UserPropertyForm from "../../components/forms/UserPropertyForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordPropertyScreen = (props) => {
    const dispatch = useDispatch();

    const landlordPropertyInfo = useSelector(
        (state) => state.landlordSignupSlice.landlordPropertyInfo
    );

    const onNext = (landlordPropertyInfo) => {
        dispatch(updateLandlordPropertyInfo({ landlordPropertyInfo }));
        props.navigation.navigate("SignupLandlordTenantScreen");
    };

    return (
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20, marginTop: 70 }}>
                Property Info
            </TextLarge>
            <TextRegular style={{ width: 250, marginBottom: 30 }}>
                Please fill out the information below for the property unit that
                you like Juzgo to help you manage. Each form is designated for
                one unit. You can register for more units later.
            </TextRegular>

            <UserPropertyForm
                info={landlordPropertyInfo}
                onPrevious={() => {
                    props.navigation.navigate("SignupLandlordInfoScreen");
                }}
                onNext={onNext}
                showDisclaimer={true}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 3 of 5</TextSmall>
        </ScreenScrollContainer>
    );
};

export default SignupLandlordPropertyScreen;
