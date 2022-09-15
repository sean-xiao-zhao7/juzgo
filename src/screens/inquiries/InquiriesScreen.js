import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// redux

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import { Pressable } from "react-native";

const InquiriesScreen = (props) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "",
            headerRight: () => {
                return (
                    <Pressable onPress={closeHandler}>
                        <FontAwesomeIcon icon={faXmark} size={40} />
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
