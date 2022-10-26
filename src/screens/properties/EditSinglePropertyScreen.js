import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";

// store
import {
    updatePropertyAPI,
    unsetActionCompleted,
} from "../../store/slices/propertySlice.js";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import UserPropertyForm from "../../components/forms/UserPropertyForm";
import Button1 from "../../components/buttons/Button1";

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
                landlordInfo: property.landlordInfo,
                tenantInfo: property.tenantInfo,
            })
        );
    };

    const copyAccessCode = async () => {
        await Clipboard.setStringAsync(property.accessCode);
    };

    return (
        <ScreenScrollContainer>
            <TextLarge style={{ marginBottom: 20 }}>
                Property{" "}
                <TextRegular style={{ fontWeight: "bold" }}>
                    Info Page
                </TextRegular>
            </TextLarge>
            <View
                style={{
                    marginBottom: 10,
                }}
            >
                <TextRegular style={{ fontWeight: "bold" }}>
                    Address:
                </TextRegular>
                <TextRegular>{property.street}</TextRegular>
                <TextRegular>
                    {property.city}, {property.province}
                </TextRegular>
                <TextRegular style={{ marginBottom: 10 }}>
                    {property.unitnum}
                </TextRegular>
                <TextRegular style={{ fontWeight: "bold" }}>
                    Tenant:
                </TextRegular>
                <TextRegular style={{ marginBottom: 10 }}>
                    {property.tenantInfo.firstname +
                        " " +
                        property.tenantInfo.lastname}
                </TextRegular>
                <TextRegular style={{ fontWeight: "bold" }}>
                    Landlord:
                </TextRegular>
                <TextRegular>
                    {property.landlordInfo.firstname +
                        " " +
                        property.landlordInfo.lastname}
                </TextRegular>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <TextLarge>{property.accessCode}</TextLarge>
                    <Button1
                        text="Tap to copy the code above"
                        onPress={copyAccessCode}
                    />
                </View>
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
        </ScreenScrollContainer>
    );
};

export default EditSinglePropertyScreen;
