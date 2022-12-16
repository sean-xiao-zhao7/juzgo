import { useDispatch, useSelector } from "react-redux";

// store
import { updateTenantInfo } from "../../store/slices/tenantSignupSlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";

import UserInfoForm from "../../components/forms/UserInfoForm";

const EditTenantPersonalInfoScreen = (props) => {
    const dispatch = useDispatch();

    const tenantInfo = useSelector(
        (state) => state.tenantSignupSlice.tenantInfo
    );

    const onSubmit = (tenantInfo) => {
        dispatch(updateTenantInfo({ tenantInfo }));
        props.navigation.navigate("AllPropertiesScreen");
    };

    return (
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20, marginTop: 50 }}>
                Edit Tenant info
            </TextLarge>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                Please confirm all information below are correct.
            </TextRegular>
            <UserInfoForm
                info={tenantInfo}
                onSubmit={onSubmit}
                onPrevious={() => props.navigation.goBack()}
                nextStepText="Submit"
            />
        </ScreenScrollContainer>
    );
};

export default EditTenantPersonalInfoScreen;
