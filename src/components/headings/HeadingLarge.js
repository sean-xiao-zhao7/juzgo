import { Text } from "react-native";

// styles
import { texts } from "../../styles/texts";

const HeadingLarge = (props) => {
    return <Text style={texts.headingLarge}>{props.children}</Text>;
};

export default HeadingLarge;
