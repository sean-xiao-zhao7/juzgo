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
        <View style={{ alignItems: "center" }}>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Unit #"}
                    style={{ width: 90, marginRight: 10 }}
                    value={unitnum}
                    onChangeText={setUnitNum}
                />
                <CustomTextInput
                    placeholder={"Unit Street Number"}
                    style={{ width: 300 }}
                    value={street}
                    onChangeText={setStreet}
                />
            </View>
            <CustomTextInput
                placeholder={"Unit City/Town"}
                style={{ width: 400 }}
                value={city}
                onChangeText={setCity}
            />
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <CustomTextInput
                    placeholder={"Province/State"}
                    style={{ width: 195, marginRight: 10 }}
                    value={province}
                    onChangeText={setProvince}
                />
                <CustomTextInput
                    placeholder={"Unit Country"}
                    style={{ width: 195 }}
                    value={country}
                    onChangeText={setCountry}
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
                    value={firstname}
                    onChangeText={setFirstname}
                />
                <CustomTextInput
                    placeholder={"Landlord Last Name"}
                    style={{ width: 195 }}
                    value={lastname}
                    onChangeText={setLastname}
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
                    value={email}
                    onChangeText={setEmail}
                />
                <CustomTextInput
                    placeholder={"Landlord Phone Number"}
                    style={{ width: 195 }}
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
                    <TextLarge>XXX-XXX-XXXX</TextLarge>
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
