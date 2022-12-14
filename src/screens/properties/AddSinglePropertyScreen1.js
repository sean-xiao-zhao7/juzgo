import { useDispatch, useSelector } from "react-redux";

// store
import {
    addNewProperty,
    toggleLoading,
} from "../../store/slices/propertySlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextLarge from "../../components/texts/TextLarge";
import UserPropertyForm from "../../components/forms/UserPropertyForm";
import NormalLoader from "../../components/loading/NormalLoader.js";

const AddPropertyScreen1 = (props) => {
    const dispatch = useDispatch();

    const newPropertyInfo = useSelector(
        (state) => state.propertySlice.newProperty
    );

    const loading = useSelector((state) => state.propertySlice.loading);

    const onNext = (newProperty) => {
        dispatch(toggleLoading());
        dispatch(addNewProperty({ newProperty }));
        props.navigation.navigate("AddPropertiesStack", {
            screen: "AddSinglePropertyScreen2",
        });
        dispatch(toggleLoading());
    };

    if (loading) {
        return <NormalLoader />;
    }

    return (
        <ScreenContainer>
            <TextLarge style={{ marginBottom: 20 }}>
                New Property Info
            </TextLarge>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please fill out the information below for additional property.
            </TextRegular>

            <UserPropertyForm
                info={newPropertyInfo}
                onPrevious={() => {
                    props.navigation.navigate("AllPropertiesScreen");
                }}
                onNext={onNext}
                previousStepText={"Go back"}
                nextStepText={"Add Tenant"}
                showDisclaimer={true}
            />
        </ScreenContainer>
    );
};

export default AddPropertyScreen1;
