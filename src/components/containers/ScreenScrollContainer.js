import { ScrollView, View } from "react-native";

// styles
import { screenContainerStyles } from "../../styles/screenSpacings";

const ScreenScrollContainer = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                contentContainerStyle={[
                    screenContainerStyles.scroll,
                    props.style,
                ]}
            >
                {props.children}
            </ScrollView>
        </View>
    );
};

export default ScreenScrollContainer;
