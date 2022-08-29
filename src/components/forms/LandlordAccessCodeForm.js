import { View } from "react-native";

// comps
import Button1 from "../buttons/Button1";
import TextLarge from "../texts/TextLarge";

const LandlordAccessCodeForm = (props) => {
    return (
        <View style={{ alignItems: "center", paddingTop: 30 }}>
            <TextLarge>XXX-XXX-XXXX</TextLarge>
            <Button1
                text="Tap to copy the code above"
                onPress={props.onPrevious}
            />
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 40,
                }}
            >
                <Button1
                    text="Previous Step"
                    onPress={props.onPrevious}
                    style={{ width: 150, marginRight: 20 }}
                />
                <Button1
                    text="Submit"
                    onPress={props.onNext}
                    style={{ width: 150 }}
                />
            </View>
        </View>
    );
};

export default LandlordAccessCodeForm;
