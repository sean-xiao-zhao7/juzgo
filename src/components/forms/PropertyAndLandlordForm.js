import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextLarge from "../texts/TextLarge";
import TextSmall from "../texts/TextSmall";

const PropertyAndLandlordForm = (props) => {
    return (
        <View style={{ alignItems: "center" }}>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Unit #"}
                    style={{ width: 90, marginRight: 10 }}
                />
                <CustomTextInput
                    placeholder={"Unit Street Number"}
                    style={{ width: 300 }}
                />
            </View>
            <CustomTextInput
                placeholder={"Unit City/Town"}
                style={{ width: 400 }}
            />
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Province/State"}
                    style={{ width: 195, marginRight: 10 }}
                />
                <CustomTextInput
                    placeholder={"Unit Country"}
                    style={{ width: 195 }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Landlord First Name"}
                    style={{ width: 195, marginRight: 10 }}
                />
                <CustomTextInput
                    placeholder={"Landlord Last Name"}
                    style={{ width: 195 }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Landlord Email"}
                    style={{ width: 195, marginRight: 10 }}
                />
                <CustomTextInput
                    placeholder={"Landlord Phone Number"}
                    style={{ width: 195 }}
                />
            </View>
            <View style={{ width: 300 }}>
                <View
                    style={{
                        alignItems: "center",
                        marginBottom: 30,
                    }}
                >
                    <TextLarge>XXX-XXX-XXXX</TextLarge>
                    <TextSmall>Tenant Access Code</TextSmall>
                </View>
            </View>
            <Button1 text="Next Step" onPress={props.onNext} />
        </View>
    );
};

export default PropertyAndLandlordForm;
