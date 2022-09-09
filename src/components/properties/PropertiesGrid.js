import { Pressable, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// comps
import PropertyPreview from "./PropertyPreview";
import TextRegular from "../texts/TextRegular";
import GrayButton from "../../components/buttons/GrayButton";

// style
import { colors } from "../../styles/colors";

const PropertiesGrid = (props) => {
    const navigation = useNavigation();

    const addProperty = () => {
        navigation.navigate("PropertiesStack");
    };

    return (
        <View style={style.twoColumns}>
            <GrayButton
                text={"Add A Property"}
                style={[style.twoColumnsChild, style.addBigButton]}
                onPress={addProperty}
            />

            {props.properties.map((property, index) => {
                return (
                    <PropertyPreview
                        property={property}
                        key={index}
                        style={style.twoColumnsChild}
                    />
                );
            })}
        </View>
    );
};

const style = StyleSheet.create({
    twoColumns: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    twoColumnsChild: {
        width: "46%",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "2%",
        marginBottom: 20,
    },
    addBigButton: {
        backgroundColor: colors.grayBackground,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        borderRadius: 20,
    },
});

export default PropertiesGrid;
