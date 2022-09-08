import { useDispatch, useSelector } from "react-redux";

// redux
import { addAccessCode } from "../../store/slices/propertySlice";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import LandlordAccessCodeForm from "../../components/forms/LandlordAccessCodeForm";

const AddSinglePropertyScreen3 = (props) => {
    const dispatch = useDispatch();

    const accessCode = useSelector((state) => state.propertySlice.accessCode);

    const onNext = (accessCode) => {
        dispatch(addAccessCode({ accessCode }));
        props.navigation.navigate("AllPropertiesScreen");
    };

    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular
                style={{ width: 250, marginBottom: 30, textAlign: "center" }}
            >
                Please{" "}
                <TextRegular style={{ fontWeight: "bold" }}>
                    give the unique TENANT ACCESS CODE below to your current or
                    future tenant to sign up with Juzgo.
                </TextRegular>
                This code is necessary to link your tenant profile to the
                property. This allows Juzgo and your tenant to communicate
                directly while you are away.
            </TextRegular>

            <LandlordAccessCodeForm
                accessCode={accessCode}
                onPrevious={() => {
                    props.navigation.navigate("AddSinglePropertyScreen2");
                }}
                onNext={onNext}
            />
        </ScreenContainer>
    );
};

export default AddSinglePropertyScreen3;
