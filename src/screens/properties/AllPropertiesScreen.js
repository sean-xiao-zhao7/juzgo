// redux
import { fetchProperties } from "../../store/slices/propertySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pressable, View } from "react-native";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import PropertiesGrid from "../../components/properties/PropertiesGrid";
import HeadingLarge from "../../components/headings/HeadingLarge";
import TextLarge from "../../components/texts/TextLarge";

// style
import { colors } from "../../styles/colors";

const AllPropertiesScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProperties());
    }, []);

    const properties = useSelector((state) => state.propertySlice.properties);

    const inquiryHandler = () => {};

    return (
        <View style={{ flex: 1 }}>
            <ScreenScrollContainer>
                <TextLarge style={{ marginTop: 100, marginBottom: 20 }}>
                    Welcome, Landlord!
                </TextLarge>
                <TextRegular style={{ marginBottom: 60 }}>
                    This the home page that shows all your properties.
                </TextRegular>
                <PropertiesGrid properties={properties} />
            </ScreenScrollContainer>
            <View
                style={{
                    padding: 10,
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPress={inquiryHandler}
                    style={{
                        backgroundColor: colors.grayBackground,
                        borderWidth: 1,
                        borderColor: colors.secondaryTextColor,
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <TextRegular>Inquiry Log</TextRegular>
                </Pressable>
                <View>
                    <HeadingLarge>JUZGO</HeadingLarge>
                    <TextRegular>Get Your Freedom Back</TextRegular>
                </View>
            </View>
        </View>
    );
};

export default AllPropertiesScreen;
