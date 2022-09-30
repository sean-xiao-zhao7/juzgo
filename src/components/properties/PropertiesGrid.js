import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// comps
import PropertyPreview from "./PropertyPreview";
import GrayButton from "../../components/buttons/GrayButton";

// style
import { colors } from "../../styles/colors";

let isTenant;

const PropertiesGrid = (props) => {
    const navigation = useNavigation();

    const addProperty = () => {
        navigation.navigate("AddPropertiesStack");
    };

    return (
        <View style={style.twoColumns}>
            {props.userType === "tenant" ? null : (
                <GrayButton
                    text={"Add A Property"}
                    style={[style.twoColumnsChild, style.addBigButton]}
                    onPress={addProperty}
                />
            )}
            {props.properties.map((property, index) => {
                return (
                    <PropertyPreview
                        property={property}
                        key={index}
                        userType={props.userType}
                        style={
                            props.userType === "tenant"
                                ? style.oneColumnChild
                                : style.twoColumnsChild
                        }
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
        marginBottom: 0,
    },
    oneColumnChild: {
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    addBigButton: {
        backgroundColor: colors.grayBackground,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        borderRadius: 20,
        height: "60%",
        alignSelf: "center",
    },
});

export default PropertiesGrid;
