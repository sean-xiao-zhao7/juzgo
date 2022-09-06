import { ScrollView } from "react-native";

// styles
import { screenContainerStyles } from "../../styles/screenSpacings";

const ScreenScrollContainer = (props) => {
    return (
        <ScrollView
            contentContainerStyle={[screenContainerStyles.style, props.style]}
        >
            {props.children}
        </ScrollView>
    );
};

export default ScreenScrollContainer;
