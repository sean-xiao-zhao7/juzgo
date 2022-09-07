import { useDispatch, useSelector } from "react-redux";

// store
import {
    addNewProperty,
    toggleLoading,
} from "../../store/slices/propertySlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import UserPropertyForm from "../../components/forms/UserPropertyForm";

const AddPropertyScreen1 = (props) => {
    const dispatch = useDispatch();

    const newPropertyInfo = useSelector(
        (state) => state.propertySlice.newProperty
    );

    const onNext = (landlordPropertyInfo) => {
        dispatch(toggleLoading());
        dispatch(addNewProperty({ landlordPropertyInfo }));
        props.navigation.navigate("AddSinglePropertyScreen2");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
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
            />
        </ScreenContainer>
    );
};

export default AddPropertyScreen1;
