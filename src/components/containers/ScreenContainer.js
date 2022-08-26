import { View } from "react-native";

// styles
import { screenContainerStyles } from "../../styles/screenSpacings";

const ScreenContainer = (props) => {
    return <View style={screenContainerStyles.style}>{props.children}</View>;
};

export default ScreenContainer;
