import { View } from "react-native";
import * as Clipboard from "expo-clipboard";

// comps
import Button1 from "../buttons/Button1";
import TextLarge from "../texts/TextLarge";

// helpers
import { generateAccessCode } from "./helpers/accessCode";

// style
import { colors } from "../../styles/colors";

const LandlordAccessCodeForm = (props) => {
    const accessCode = generateAccessCode();

    const copyAccessCode = async () => {
        await Clipboard.setStringAsync(accessCode);
    };

    return (
        <View style={{ alignItems: "center", paddingTop: 30 }}>
            <TextLarge style={{ fontWeight: "bold", marginBottom: 20 }}>
                {accessCode}
            </TextLarge>
            <Button1
                text="TAP HERE TO COPY THE CODE ABOVE"
                onPress={copyAccessCode}
                style={{
                    backgroundColor: colors.lightOrange,
                }}
                textStyle={{ fontWeight: "bold" }}
            />
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 20,
                }}
            >
                <Button1
                    text="Previous Step"
                    onPress={props.onPrevious}
                    style={{ width: 120, marginRight: 10 }}
                />
                <Button1
                    text="Next"
                    onPress={() => props.onNext(accessCode)}
                    style={{ width: 120 }}
                />
            </View>
        </View>
    );
};

export default LandlordAccessCodeForm;
