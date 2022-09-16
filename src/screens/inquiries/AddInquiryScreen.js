import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";

// redux
import { addInquiryAPI } from "../../store/slices/inquirySlice";

// form
import { incompleteErrorAlert } from "../../components/forms/helpers/alert";
import { emptyVerify } from "../../components/forms/helpers/verifyForm";

const AddInquiryScreen = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "New Inquiry",
            headerBackTitleVisible: false,
        });
    }, []);

    const addInquiryHandler = () => {
        dispatch(addInquiryAPI({ title, description }));
        props.navigation.goBack();
    };

    return (
        <ScreenContainer>
            <CustomTextInput
                placeholder={"Reason of Inquiry"}
                onChangeText={setTitle}
                value={title}
            />
            <CustomTextInput
                placeholder={"Please provide the detail of the inquiry."}
                onChangeText={setDescription}
                value={description}
                multiline={true}
                style={{ height: 100 }}
            />
            <Button1
                text={"Start inquiry"}
                onPress={() => {
                    if (emptyVerify([title, description])) {
                        addInquiryHandler();
                    } else {
                        incompleteErrorAlert();
                    }
                }}
            />
        </ScreenContainer>
    );
};

export default AddInquiryScreen;
