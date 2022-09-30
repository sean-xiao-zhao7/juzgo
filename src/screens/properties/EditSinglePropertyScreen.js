import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// store
import {
    updatePropertyAPI,
    unsetActionCompleted,
} from "../../store/slices/propertySlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import UserPropertyForm from "../../components/forms/UserPropertyForm";

// errors
import { customAlert } from "../../components/forms/helpers/alert.js";
import { useEffect } from "react";

const EditSinglePropertyScreen = (props) => {
    const dispatch = useDispatch();
    const property = props.route.params.property;

    const [updateError, actionCompleted] = useSelector((state) => {
        return [state.propertySlice.error, state.propertySlice.actionCompleted];
    });

    useEffect(() => {
        if (updateError) {
            customAlert("Error updating property.");
        } else if (actionCompleted) {
            props.navigation.navigate("AllPropertiesScreen");
            dispatch(unsetActionCompleted());
        }
    }, [updateError, actionCompleted]);

    const onNext = (updatedPropertyInfo) => {
        dispatch(
            updatePropertyAPI({
                updatedPropertyInfo: {
                    ...updatedPropertyInfo,
                    accessCode: property.accessCode,
                    landlord: property.landlord,
                    tenant: property.tenant,
                },
                firebaseId: property.firebaseId,
            })
        );
    };

    return (
        <ScreenContainer>
            <TextLarge style={{ marginBottom: 20 }}>
                Property{" "}
                <TextRegular style={{ fontWeight: "bold" }}>
                    Edit Page
                </TextRegular>
            </TextLarge>
            <View style={{ width: 250, marginBottom: 30 }}>
                <TextRegular style={{ textAlign: "center" }}>
                    {property.street}
                </TextRegular>
                <TextRegular style={{ textAlign: "center" }}>
                    {property.city}, {property.province}
                </TextRegular>
                <TextRegular style={{ textAlign: "center" }}>
                    {property.unitnum}
                </TextRegular>
                <TextRegular style={{ textAlign: "center" }}>
                    Tenant:{" "}
                    {property.tenantInfo.firstname +
                        " " +
                        property.tenantInfo.lastname}
                </TextRegular>
                <TextRegular style={{ textAlign: "center" }}>
                    Owner:{" "}
                    {property.landlordInfo.firstname +
                        " " +
                        property.landlordInfo.lastname}
                </TextRegular>
            </View>

            <UserPropertyForm
                info={property}
                onPrevious={() => {
                    props.navigation.goBack();
                }}
                onNext={onNext}
                nextStepText={"Update"}
                previousStepText={"Back"}
            />
        </ScreenContainer>
    );
};

export default EditSinglePropertyScreen;
