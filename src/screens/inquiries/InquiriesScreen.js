import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";

// redux
import { getInquiriesAPI } from "../../store/slices/inquirySlice";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import TextMedium from "../../components/texts/TextMedium";

// style
import { colors } from "../../styles/colors";
import { pressablePressedNoMargin } from "../../styles/helpers";

const InquiriesScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInquiriesAPI());
    }, []);

    const inquiries = useSelector((state) => state.inquirySlice.inquiries);
    const userType = useSelector((state) => state.sessionSlice.type);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "Inquiries",
            headerRight: () => {
                return (
                    <Pressable onPress={closeHandler}>
                        <FontAwesomeIcon icon={faXmark} size={30} />
                    </Pressable>
                );
            },
        });
    }, []);

    const closeHandler = () => {
        props.navigation.navigate("AllPropertiesScreen");
    };

    const addInquiryHandler = () => {
        props.navigation.navigate("InquiriesStackComp", {
            screen: "AddInquiryScreen",
        });
    };

    return (
        <ScreenScrollContainer>
            <View
                style={{
                    padding: 10,
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: inquiries.length > 0 ? "stretch" : "center",
                }}
            >
                {inquiries.length > 0 ? (
                    inquiries.map((inquiry, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => {
                                    props.navigation.navigate(
                                        "InquiriesStackComp",
                                        {
                                            screen: "InquiryMessagesScreen",
                                            params: {
                                                inquiryId: inquiry.inquiryId,
                                            },
                                        }
                                    );
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",

                                        backgroundColor: colors.primaryColor,
                                        borderRadius: 5,

                                        paddingVertical: 20,
                                        paddingHorizontal: 20,
                                        marginBottom: 10,
                                    }}
                                >
                                    <TextMedium style={{ color: "white" }}>
                                        {inquiry.title}
                                    </TextMedium>
                                    <TextMedium style={{ color: "white" }}>
                                        {inquiry.startDate}
                                    </TextMedium>
                                </View>
                            </Pressable>
                        );
                    })
                ) : (
                    <TextRegular>No inquiries</TextRegular>
                )}
            </View>
            {userType !== "landlord" ? (
                <View
                    style={{
                        marginTop: 50,
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        onPress={addInquiryHandler}
                        style={pressablePressedNoMargin}
                    >
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            size={60}
                            color={colors.primaryColor}
                        />
                    </Pressable>
                </View>
            ) : null}
        </ScreenScrollContainer>
    );
};

export default InquiriesScreen;
