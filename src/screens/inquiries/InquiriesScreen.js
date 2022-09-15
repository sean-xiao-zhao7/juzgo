import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// redux

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import TextRegular from "../../components/texts/TextRegular";
import { Pressable } from "react-native";

const InquiriesScreen = (props) => {
    const dispatch = useDispatch();

    const closeHandler = () => {
        props.navigation.navigate("AllPropertiesScreen");
    };

    return (
        <ScreenContainer>
            <Pressable onPress={closeHandler}>
                <FontAwesomeIcon icon={faXmark} size={40} />
            </Pressable>
        </ScreenContainer>
    );
};

export default InquiriesScreen;
