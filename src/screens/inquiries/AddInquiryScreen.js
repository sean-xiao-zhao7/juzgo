import { useLayoutEffect, useState } from "react";

// comps
import ScreenContainer from "../../components/containers/ScreenContainer";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import Button1 from "../../components/buttons/Button1";

const AddInquiryScreen = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "New Inquiry",
            headerBackTitleVisible: false,
        });
    }, []);

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
            <Button1 text={"Start inquiry"} onPress={() => {}} />
        </ScreenContainer>
    );
};

export default AddInquiryScreen;
