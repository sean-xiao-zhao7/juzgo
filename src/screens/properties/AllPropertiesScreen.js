import { StyleSheet, View } from "react-native";

// redux
import { fetchProperties } from "../../store/slices/propertySlice";
import { signOut } from "../../store/slices/sessionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import PropertiesGrid from "../../components/properties/PropertiesGrid";
import HeadingLarge from "../../components/headings/HeadingLarge";
import TextLarge from "../../components/texts/TextLarge";
import GrayButton from "../../components/buttons/GrayButton";

// style
import { colors } from "../../styles/colors";

const AllPropertiesScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProperties());
    }, []);

    const { properties, userType } = useSelector((state) => {
        return {
            properties: state.propertySlice.properties,
            userType: state.sessionSlice.type,
        };
    });

    const inquiryHandler = () => {};

    const logoutHandler = () => {
        dispatch(signOut());
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScreenScrollContainer
                style={{ justifyContent: "flex-start", flex: "auto" }}
            >
                <TextLarge style={{ marginTop: 100, marginBottom: 20 }}>
                    Welcome, {userType === "landlord" ? "Landlord" : "Tenant"}!
                </TextLarge>
                <TextRegular style={{ marginBottom: 60 }}>
                    This is the home page that shows all your properties.
                </TextRegular>
                <PropertiesGrid properties={properties} />
            </ScreenScrollContainer>
            <View
                style={{
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <GrayButton
                        text={"Inquiry Log"}
                        onPress={inquiryHandler}
                        style={style.grayButton}
                    />
                    <View style={{ width: 5 }}></View>
                    <GrayButton
                        text={"Log out"}
                        onPress={logoutHandler}
                        style={style.grayButton}
                    />
                </View>
                <View>
                    <HeadingLarge>JUZGO</HeadingLarge>
                    <TextRegular>Get Your Freedom Back</TextRegular>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    grayButton: {
        backgroundColor: colors.grayBackground,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default AllPropertiesScreen;
