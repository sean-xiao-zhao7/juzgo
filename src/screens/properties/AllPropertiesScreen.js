import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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

// style
import { colors } from "../../styles/colors";
import { pressablePressed } from "../../styles/helpers";

const AllPropertiesScreen = (props) => {
    const dispatch = useDispatch();

    const { properties, userType } = useSelector((state) => {
        return {
            properties: state.propertySlice.properties,
            userType: state.sessionSlice.type,
        };
    });

    useEffect(() => {
        if (userType !== "none" && userType !== "") {
            dispatch(fetchProperties());
        }
    }, []);

    const inquiryHandler = () => {
        props.navigation.navigate("InquiriesStackComp", {
            screen: "InquiriesScreen",
        });
    };

    const logoutHandler = () => {
        dispatch(signOut());
    };

    let greeting = "Welcome, ";
    let longGreeting = "";
    if (userType === "landlord") {
        greeting += "Landlord!";
        longGreeting = "This is the home page that shows all your properties.";
    } else if (userType === "tenant") {
        greeting += "Tenant!";
        longGreeting =
            "This is the home page that show the property you manage.";
    } else if (userType === "manager") {
        greeting += "JUZGO Manager!";
        longGreeting =
            "This screen shows all properties landlords are managing. You can use the Inquiries button at the bottom to communicate with tenants.";
    } else if (userType === "none" || !userType) {
        greeting += "JUZGO user!";
        longGreeting = "You are not landlord/tenant yet.";
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingHorizontal: 10,
                backgroundColor: "white",
            }}
        >
            {userType !== "none" && userType !== "" ? (
                <ScreenScrollContainer
                    style={{
                        justifyContent: "flex-start",
                        flex: "auto",
                    }}
                >
                    <TextLarge
                        style={{
                            marginTop: 100,
                            marginBottom: 20,
                            fontWeight: "bold",
                        }}
                    >
                        {greeting}
                    </TextLarge>
                    <TextRegular style={{ marginBottom: 60 }}>
                        {longGreeting}
                    </TextRegular>
                    <PropertiesGrid
                        properties={properties}
                        userType={userType}
                    />
                </ScreenScrollContainer>
            ) : (
                <ScreenScrollContainer
                    style={{
                        justifyContent: "flex-start",
                        flex: "auto",
                    }}
                >
                    <TextLarge style={{ marginTop: 100, marginBottom: 20 }}>
                        {greeting}
                    </TextLarge>
                    <TextRegular style={{ marginBottom: 60 }}>
                        {longGreeting}
                    </TextRegular>
                </ScreenScrollContainer>
            )}
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
                    <Pressable
                        onPress={inquiryHandler}
                        style={pressablePressed}
                    >
                        <FontAwesomeIcon icon={faComments} size={40} />
                        <TextRegular>Inquiries</TextRegular>
                    </Pressable>
                    <Pressable onPress={logoutHandler} style={pressablePressed}>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size={40}
                        />
                        <TextRegular>Logout</TextRegular>
                    </Pressable>
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
