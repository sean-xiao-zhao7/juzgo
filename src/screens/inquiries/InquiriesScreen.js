import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Pressable } from "react-native";

// redux

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";

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

    return <ScreenContainer></ScreenContainer>;
};

export default InquiriesScreen;
