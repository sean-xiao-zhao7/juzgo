import { Pressable, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// comps
import PropertyPreview from "./PropertyPreview";
import TextRegular from "../texts/TextRegular";

// style
import { colors } from "../../styles/colors";

const PropertiesGrid = (props) => {
    const navigation = useNavigation();

    const addProperty = () => {
        navigation.navigate("PropertiesStack");
    };

    return (
        <View style={style.twoColumns}>
            {props.properties.map((property, index) => {
                return (
                    <PropertyPreview
                        property={property}
                        key={index}
                        style={style.twoColumnsChild}
                    />
                );
            })}
            <Pressable
                style={[style.twoColumnsChild, style.addBigButton]}
                onPress={addProperty}
            >
                <TextRegular>Add A Property</TextRegular>
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    twoColumns: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    twoColumnsChild: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
    },
    addBigButton: {
        backgroundColor: colors.grayBackground,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        borderRadius: 20,
    },
});

export default PropertiesGrid;
