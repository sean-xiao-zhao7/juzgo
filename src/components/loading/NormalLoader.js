import { ActivityIndicator } from "react-native";
import ScreenContainer from "../../components/containers/ScreenContainer";

const NormalLoader = () => {
    return (
        <ScreenContainer>
            <ActivityIndicator />
        </ScreenContainer>
    );
};

export default NormalLoader;
