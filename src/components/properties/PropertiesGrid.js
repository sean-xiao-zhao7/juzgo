import { View } from "react-native";
import PropertyPreview from "./PropertyPreview";

const PropertiesGrid = (props) => {
    return (
        <View>
            {props.properties.map((property, index) => {
                return <PropertyPreview property={property} key={index} />;
            })}
        </View>
    );
};

export default PropertiesGrid;
