import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import Checkbox from "expo-checkbox";

// comps
import TextRegular from "../texts/TextRegular";
import TextSmall from "../texts/TextSmall";
import { useState } from "react";

const PropertyPreview = (props) => {
    const [allowManage, setAllowManage] = useState(false);

    return (
        <View>
            <FontAwesomeIcon icon={faHouse} style={{ height: 50, width: 50 }} />
            <TextRegular>{props.property.street}</TextRegular>
            <TextRegular>
                {props.property.city}, {props.property.province}
            </TextRegular>
            <TextRegular>{props.property.unitnum}</TextRegular>
            <View>
                <View>
                    <Checkbox
                        value={allowManage}
                        onValueChange={setAllowManage}
                    />
                    <TextSmall>
                        Turn on to allow Juzgo to manage this property. This
                        will allow Juzgo to communicate directly with tenant.
                    </TextSmall>
                </View>
                <View>
                    <TextRegular>Add A Property</TextRegular>
                </View>
            </View>
        </View>
    );
};

export default PropertyPreview;
