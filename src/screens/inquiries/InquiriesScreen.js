import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";

// redux

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";

// style
import { colors } from "../../styles/colors";
import { pressablePressed } from "../../styles/helpers";

const InquiriesScreen = (props) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "Inquiries Log",
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
