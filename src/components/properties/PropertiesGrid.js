import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";

const PropertiesGrid = (props) => {
    return (
        <View>
            {props.properties.map((property) => {
                return (
                    <View>
                        <FontAwesomeIcon icon={faHouse} />
                    </View>
                );
            })}
        </View>
    );
};

export default PropertiesGrid;
