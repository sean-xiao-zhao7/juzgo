import { useDispatch, useSelector } from "react-redux";

// store
import { updateLandlordTenantInfo } from "../../store/slices/landlordSignupSlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import TenantForm from "../../components/forms/TenantForm";
import TextSmall from "../../components/texts/TextSmall";

const SignupLandlordTenantScreen = (props) => {
    const dispatch = useDispatch();

    const landlordTenantInfo = useSelector(
        (state) => state.landlordSignupSlice.landlordTenantInfo
    );

    const onNext = (landlordTenantInfo) => {
        dispatch(updateLandlordTenantInfo({ landlordTenantInfo }));
        props.navigation.navigate("SignupLandlordTenantAccessCodeScreen");
    };

    return (
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20, marginTop: 50 }}>
                Tenant Info
            </TextLarge>
            <TextRegular style={{ width: 250, marginBottom: 30 }}>
                Please fill out the information below for the{" "}
                <TextRegular style={{ fontWeight: "bold" }}>tenant</TextRegular>{" "}
                in the unit of the property you just filled out.
            </TextRegular>

            <TenantForm
                info={landlordTenantInfo}
                onPrevious={() => {
                    props.navigation.navigate("SignupLandlordPropertyScreen");
                }}
                onNext={onNext}
                onSkip={() => {
                    props.navigation.navigate("AllPropertiesScreen");
                }}
            />
            <TextSmall style={{ marginTop: 60 }}>Step 4 of 5</TextSmall>
        </ScreenScrollContainer>
    );
};

export default SignupLandlordTenantScreen;
