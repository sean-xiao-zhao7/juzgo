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
import UserPropertyForm from "../../components/forms/UserPropertyForm";

// errors
import { customAlert } from "../../components/forms/helpers/alert.js";

const EditSinglePropertyScreen = (props) => {
    const dispatch = useDispatch();
    const property = props.route.params.property;

    const [updateError, actionCompleted] = useSelector((state) => {
        return [state.propertySlice.error, state.propertySlice.actionCompleted];
    });

    if (updateError) {
        customAlert("Error updating property.");
    } else if (actionCompleted) {
        props.navigation.navigate("AllPropertiesScreen");
        dispatch(unsetActionCompleted());
    }

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
            <TextRegular style={{ marginBottom: 20 }}>
                Property{" "}
                <TextRegular
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                    Edit Page
                </TextRegular>
            </TextRegular>
            <View style={{ width: 250, marginBottom: 30, textAlign: "center" }}>
                <TextRegular>{property.street}</TextRegular>
                <TextRegular>
                    {property.city}, {property.province}
                </TextRegular>
                <TextRegular>{property.unitnum}</TextRegular>
            </View>

            <UserPropertyForm
                info={property}
                onPrevious={() => {
                    props.navigation.goBack();
                }}
                onNext={onNext}
                nextStepText={"Update"}
                previousStepText={"Cancel"}
            />
        </ScreenContainer>
    );
};

export default EditSinglePropertyScreen;
