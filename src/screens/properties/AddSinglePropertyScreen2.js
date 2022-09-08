import { useDispatch, useSelector } from "react-redux";

// store
import { addNewTenant } from "../../store/slices/propertySlice.js";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import TenantForm from "../../components/forms/TenantForm";

const AddSinglePropertyScreen2 = (props) => {
    const dispatch = useDispatch();

    const newTenant = useSelector((state) => state.propertySlice.newTenant);

    const onNext = (newTenant) => {
        dispatch(addNewTenant({ newTenant }));
        props.navigation.navigate("AddSinglePropertyScreen3");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please fill out the information below for the{" "}
                <TextRegular style={{ fontWeight: "bold" }}>tenant</TextRegular>{" "}
                in the unit of the property you just filled out.
            </TextRegular>

            <TenantForm
                info={newTenant}
                onPrevious={() => {
                    props.navigation.navigate("AddSinglePropertyScreen1");
                }}
                onNext={onNext}
                onSkip={() => {
                    props.navigation.navigate("AddSinglePropertyScreen3");
                }}
            />
        </ScreenContainer>
    );
};

export default AddSinglePropertyScreen2;
