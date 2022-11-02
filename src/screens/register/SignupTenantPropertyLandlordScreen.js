import { useDispatch, useSelector } from "react-redux";

// store
import {
    updatePropertyInfo,
    updateLandlordInfo,
    unsetAccessCode,
} from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import PropertyAndLandlordForm from "../../components/forms/PropertyAndLandlordForm";
import Button1 from "../../components/buttons/Button1";

const SignupTenantPropertyLandlordScreen = (props) => {
    const dispatch = useDispatch();

    const landlordInfo = useSelector(
        (state) => state.tenantSignupSlice.landlordInfo
    );

    const propertyInfo = useSelector(
        (state) => state.tenantSignupSlice.propertyInfo
    );

    const accessCode = useSelector(
        (state) => state.tenantSignupSlice.accessCode
    );

    const onNext = (landlordInfo, propertyInfo) => {
        dispatch(updatePropertyInfo({ propertyInfo }));
        dispatch(updateLandlordInfo({ landlordInfo }));
        props.navigation.navigate("SignupTenantPersonalInfoScreen");
    };

    return (
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20, marginTop: 50 }}>
                Property / Landlord{" "}
                <TextLarge
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                    Info
                </TextLarge>
            </TextLarge>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                Please confirm all information below are correct. If there is
                anything incorrect, please advise the Landlord to change before
                proceeding.
            </TextRegular>
            <PropertyAndLandlordForm
                propertyInfo={propertyInfo}
                landlordInfo={landlordInfo}
                accessCode={accessCode}
                onNext={onNext}
            />
            <Button1
                text="Cancel"
                onPress={() => {
                    dispatch(unsetAccessCode());
                    props.navigation.navigate("LoginScreen");
                }}
            />
        </ScreenScrollContainer>
    );
};

export default SignupTenantPropertyLandlordScreen;
