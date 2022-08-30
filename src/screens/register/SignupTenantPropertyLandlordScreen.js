import { useDispatch, useSelector } from "react-redux";

// store
import {
    updatePropertyInfo,
    updateLandlordInfo,
} from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import PropertyAndLandlordForm from "../../components/forms/PropertyAndLandlordForm";

const SignupTenantPropertyLandlordScreen = (props) => {
    const dispatch = useDispatch();

    const landlordInfo = useSelector(
        (state) => state.tenantSignupSlice.landlordInfo
    );

    const propertyInfo = useSelector(
        (state) => state.tenantSignupSlice.propertyInfo
    );

    const onNext = (landlordInfo, propertyInfo) => {
        dispatch(updatePropertyInfo({ landlordInfo }));
        dispatch(updateLandlordInfo({ propertyInfo }));
        props.navigation.navigate("SignupTenantPersonalInfoScreen");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Property and Tenant{" "}
                <TextRegular
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                    Info
                </TextRegular>
            </TextRegular>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                Please confirm all information below are correct. If there is
                anything incorrect, please advise the Landlord to change before
                proceeding.
            </TextRegular>
            <PropertyAndLandlordForm
                propertyInfo={propertyInfo}
                landlordInfo={landlordInfo}
                onNext={onNext}
            />
        </ScreenContainer>
    );
};

export default SignupTenantPropertyLandlordScreen;
