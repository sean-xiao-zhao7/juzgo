import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";

// redux
import {
    addInquiryMessageAPI,
    getInquiry,
} from "../../store/slices/inquirySlice";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import TextMedium from "../../components/texts/TextMedium";
import NormalLoader from "../../components/loading/NormalLoader";

// style
import { colors } from "../../styles/colors";
import { pressablePressedInput } from "../../styles/helpers";
import { useEffect } from "react";

const InquiryMessagesScreen = (props) => {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState("");
    const inquiryId = props.route.params.inquiryId;

    // get inquiry if new message is added
    const inquiry = useSelector((state) => state.inquirySlice.currentInquiry);
    const userType = useSelector((state) => state.sessionSlice.type);

    const closeHandler = () => {
        props.navigation.navigate("AllPropertiesScreen");
    };

    useEffect(() => {
        dispatch(getInquiry(inquiryId));
    }, [inquiryId]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: `${inquiry ? inquiry.title : ""}`,
            headerRight: () => {
                return (
                    <Pressable onPress={closeHandler}>
                        <FontAwesomeIcon icon={faXmark} size={30} />
                    </Pressable>
                );
            },
        });
    }, []);

    if (!inquiry) {
        return <NormalLoader />;
    }

    let messages = [];
    if (inquiry.messages) {
        for (const key in inquiry.messages) {
            messages.push(inquiry.messages[key]);
        }
    }

    const addMessageHandler = () => {
        dispatch(
            addInquiryMessageAPI({
                inquiryId: inquiry.inquiryId,
                message: newMessage,
            })
        );
        setNewMessage("");
    };

    // set up messages section
    let messagesComp = (
        <View
            style={{
                padding: 30,
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextMedium>No messages</TextMedium>
        </View>
    );
    if (messages.length > 0) {
        messagesComp = (
            <View
                style={{
                    padding: 20,
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                {messages.map((message, index) => {
                    let messageRow = "";
                    if (
                        (userType === "manager" && !message.isTenant) ||
                        (userType === "tenant" && message.isTenant) ||
                        (userType === "landlord" && message.isTenant)
                    ) {
                        messageRow = (
                            <View
                                style={{
                                    backgroundColor: colors.grayBackground,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <TextMedium>
                                    {userType !== "manager"
                                        ? "Tenant: "
                                        : "JUZGO: "}
                                    {message.message}
                                </TextMedium>
                            </View>
                        );
                        return (
                            <View
                                key={index}
                                style={{
                                    width: "100%",
                                    alignItems: "flex-end",
                                }}
                            >
                                {messageRow}
                            </View>
                        );
                    } else {
                        messageRow = (
                            <View
                                style={{
                                    backgroundColor: colors.grayBackground,
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <TextMedium>
                                    {userType === "manager"
                                        ? "Tenant: "
                                        : "JUZGO: "}
                                    : {message.message}
                                </TextMedium>
                            </View>
                        );
                        return (
                            <View
                                key={index}
                                style={{
                                    width: "100%",
                                    alignItems: "flex-start",
                                }}
                            >
                                {messageRow}
                            </View>
                        );
                    }
                })}
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScreenScrollContainer>{messagesComp}</ScreenScrollContainer>
            {userType !== "landlord" ? (
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        backgroundColor: colors.textinputBackground,
                    }}
                >
                    <CustomTextInput
                        placeholder={"New message"}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        style={{
                            borderWidth: 0,
                            fontSize: 16,
                            borderRadius: 0,
                            width: "85%",
                        }}
                    />
                    <Pressable
                        onPress={addMessageHandler}
                        style={pressablePressedInput}
                    >
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            size={40}
                            color={colors.primaryColor}
                        />
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
};

export default InquiryMessagesScreen;
