import { useState } from "react";
import { View } from "react-native";

// comps
import CustomTextInput from "../inputs/CustomTextInput";
import Button1 from "../buttons/Button1";
import TextLarge from "../texts/TextLarge";
import TextSmall from "../texts/TextSmall";

const PropertyAndLandlordForm = (props) => {
    const [firstname, setFirstname] = useState(
        props.landlordInfo?.firstname ? props.landlordInfo.firstname : ""
    );
    const [lastname, setLastname] = useState(
        props.landlordInfo?.lastname ? props.landlordInfo.lastname : ""
    );
    const [email, setEmail] = useState(
        props.landlordInfo?.email ? props.landlordInfo.email : ""
    );
    const [phone, setPhone] = useState(
        props.landlordInfo?.phone ? props.landlordInfo.phone : ""
    );
    const [unitnum, setUnitNum] = useState(
        props.propertyInfo?.unitnum ? props.propertyInfo.unitnum : ""
    );
    const [street, setStreet] = useState(
        props.propertyInfo?.street ? props.propertyInfo.street : ""
    );
    const [city, setCity] = useState(
        props.propertyInfo?.city ? props.propertyInfo.city : ""
    );
    const [province, setProvince] = useState(
        props.propertyInfo?.province ? props.propertyInfo.province : ""
    );
    const [country, setCountry] = useState(
        props.propertyInfo?.country ? props.propertyInfo.country : ""
    );

    return (
        <View
            style={{
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <CustomTextInput
                    placeholder={"Unit #"}
                    style={{ width: "30%", marginRight: 10 }}
                    value={unitnum}
                    onChangeText={setUnitNum}
                />
                <CustomTextInput
                    placeholder={"Unit Street Number"}
                    style={{ flex: 1 }}
                    value={street}
                    onChangeText={setStreet}
                />
            </View>
            <View style={{ width: "100%" }}>
                <CustomTextInput
                    placeholder={"Unit City/Town"}
                    value={city}
                    onChangeText={setCity}
                    style={{ width: "100%" }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <CustomTextInput
                    placeholder={"Province/State"}
                    style={{ flex: 1, marginRight: 10 }}
                    value={province}
                    onChangeText={setProvince}
                />
                <CustomTextInput
                    placeholder={"Unit Country"}
                    style={{ flex: 1 }}
                    value={country}
                    onChangeText={setCountry}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <CustomTextInput
                    placeholder={"Landlord First Name"}
                    style={{ flex: 1, marginRight: 10 }}
                    value={firstname}
                    onChangeText={setFirstname}
                />
                <CustomTextInput
                    placeholder={"Landlord Last Name"}
                    style={{ flex: 1 }}
                    value={lastname}
                    onChangeText={setLastname}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <CustomTextInput
                    placeholder={"Landlord Email"}
                    style={{ flex: 1, marginRight: 10 }}
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomTextInput
                    placeholder={"Landlord Phone Number"}
                    style={{ flex: 1 }}
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={{ width: 300 }}>
                <View
                    style={{
                        alignItems: "center",
                        marginBottom: 30,
                    }}
                >
                    <TextLarge>{props.accessCode}</TextLarge>
                    <TextSmall>Tenant Access Code</TextSmall>
                </View>
            </View>
            <Button1
                text="Next Step"
                onPress={() =>
                    props.onNext(
                        { firstname, lastname, email, phone },
                        { unitnum, street, city, province, country }
                    )
                }
            />
        </View>
    );
};

export default PropertyAndLandlordForm;
