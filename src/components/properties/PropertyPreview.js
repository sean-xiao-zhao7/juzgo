import { useState } from "react";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import Checkbox from "expo-checkbox";

// comps
import TextRegular from "../texts/TextRegular";
import TextSmall from "../texts/TextSmall";

// style
import { colors } from "../../styles/colors";

const PropertyPreview = (props) => {
    const [allowManage, setAllowManage] = useState(false);
    const [landlordStatus, setLandlordStatus] = useState("Away");

    return (
        <View
            style={[
                {
                    alignItems: "center",
                },
                props.style,
            ]}
        >
            <FontAwesomeIcon
                icon={faHouse}
                size={80}
                style={{ color: colors.primaryColor }}
            />
            <TextRegular>{props.property.street}</TextRegular>
            <TextRegular>
                {props.property.city}, {props.property.province}
            </TextRegular>
            <TextRegular>{props.property.unitnum}</TextRegular>
            {props.isTenant ? (
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 40,
                        padding: 10,
                        maxWidth: 500,
                    }}
                >
                    <TextRegular
                        style={{
                            color: colors.secondaryTextColor,
                            fontWeight: "bold",
                            fontSize: 18,
                            marginBottom: 40,
                        }}
                    >
                        Landlord Status:{" "}
                        <TextRegular style={{ color: "red" }}>
                            {landlordStatus}
                        </TextRegular>
                    </TextRegular>
                    <TextRegular style={{ color: colors.secondaryTextColor }}>
                        If the Landlord status is{" "}
                        <TextRegular
                            style={{
                                textDecoration: "underline",
                                fontWeight: "bold",
                            }}
                        >
                            Away
                        </TextRegular>
                        , then{" "}
                        <TextRegular
                            style={{
                                fontWeight: "bold",
                                color: colors.secondaryTextColor,
                            }}
                        >
                            JUZGO will step in to help manage this unit.
                        </TextRegular>{" "}
                        For any inquiry, please{" "}
                        <TextRegular
                            style={{
                                fontWeight: "bold",
                                color: colors.secondaryTextColor,
                            }}
                        >
                            use the chat box below to reach out to our team.
                        </TextRegular>{" "}
                        We will respond as soon as the next representative is
                        available.
                    </TextRegular>
                </View>
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        padding: 10,
                    }}
                >
                    <Checkbox
                        value={allowManage}
                        onValueChange={setAllowManage}
                        style={{
                            marginRight: 5,
                        }}
                    />
                    <TextSmall style={{ color: colors.secondaryTextColor }}>
                        Turn on to allow Juzgo to manage this property. This
                        will allow Juzgo to communicate directly with tenant.
                    </TextSmall>
                </View>
            )}
        </View>
    );
};

export default PropertyPreview;
