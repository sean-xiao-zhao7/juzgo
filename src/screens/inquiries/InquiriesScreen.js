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
import TextLarge from "../../components/texts/TextLarge";

// style
import { colors } from "../../styles/colors";
import { pressablePressed } from "../../styles/helpers";

const InquiriesScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInquiriesAPI());
    }, []);

    const inquiries = useSelector((state) => state.inquirySlice.inquiries);

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
                    padding: 30,
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                }}
            >
                {inquiries.map((inquiry, index) => {
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

                                    backgroundColor: colors.grayBackground,

                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: colors.secondaryTextColor,

                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                }}
                            >
                                <TextLarge>{inquiry.title}</TextLarge>
                                <TextRegular>{inquiry.startDate}</TextRegular>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
            <View style={{ position: "absolute", bottom: 80, right: 30 }}>
                <Pressable onPress={addInquiryHandler} style={pressablePressed}>
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        size={60}
                        color={colors.primaryColor}
                    />
                </Pressable>
            </View>
        </ScreenScrollContainer>
    );
};

export default InquiriesScreen;
