import { View } from "react-native";

// comps
import TextRegular from "../../components/texts/TextRegular";

const SignupLandlordInfoScreen = (props) => {
    return (
        <View>
            <TextRegular>Welcome, Landlord!</TextRegular>
            <TextRegular>Please fill out the information below. </TextRegular>
        </View>
    );
};

export default SignupLandlordInfoScreen;
