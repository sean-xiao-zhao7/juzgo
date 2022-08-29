// comps
import ScreenContainer from "../components/containers/ScreenContainer";
import TextRegular from "../components/texts/TextRegular";

const AllPropertiesScreen = (props) => {
    return (
        <ScreenContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                This the home page that shows all your properties.
            </TextRegular>
        </ScreenContainer>
    );
};

export default AllPropertiesScreen;
