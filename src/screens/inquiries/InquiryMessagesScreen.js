import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";

// redux
import { addInquiryMessagesAPI } from "../../store/slices/inquirySlice";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import TextLarge from "../../components/texts/TextLarge";

// style
import { colors } from "../../styles/colors";
import { pressablePressed } from "../../styles/helpers";
import TextRegular from "../../components/texts/TextRegular";

const InquiryMessagesScreen = (props) => {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState("");
    const inquiry = props.route.params.inquiry;
    const messages = inquiry.messages ? inquiry.messages : [];

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: `Inquiry ${inquiry.title}`,
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

    const addMessageHandler = () => {
        dispatch(addInquiryMessagesAPI());
    };

    let messagesComp;
    if (messages.length > 0) {
        messagesComp = (
            <View
                style={{
                    padding: 30,
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                {messages.forEach((message, index) => {
                    return (
                        <TextRegular key={index}>{message.message}</TextRegular>
                    );
                })}
            </View>
        );
    } else {
        messagesComp = (
            <View
                style={{
                    padding: 30,
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextLarge>No messages</TextLarge>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScreenScrollContainer>{messagesComp}</ScreenScrollContainer>
            <View style={{ width: "100%" }}>
                <CustomTextInput
                    placeholder={"New message"}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    style={{
                        borderWidth: 0,
                        width: "100%",
                        fontSize: 16,
                        borderRadius: 0,
                    }}
                />
            </View>
        </View>
    );
};

export default InquiryMessagesScreen;
