import { View } from "react-native";
import * as Clipboard from "expo-clipboard";

// comps
import Button1 from "../buttons/Button1";
import TextLarge from "../texts/TextLarge";

// helpers
import { generateAccessCode } from "./helpers/accessCode";

const LandlordAccessCodeForm = (props) => {
    const accessCode = generateAccessCode();

    const copyAccessCode = async () => {
        await Clipboard.setStringAsync(accessCode);
    };

    return (
        <View style={{ alignItems: "center", paddingTop: 30 }}>
            <TextLarge>{accessCode}</TextLarge>
            <Button1
                text="Tap to copy the code above"
                onPress={copyAccessCode}
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
                    style={{ width: 120, marginRight: 10 }}
                />
                <Button1
                    text="Submit"
                    onPress={() => props.onNext(accessCode)}
                    style={{ width: 120 }}
                />
            </View>
        </View>
    );
};

export default LandlordAccessCodeForm;
