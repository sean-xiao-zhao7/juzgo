// redux
import { fetchProperties } from "../../store/slices/propertySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// comps
import ScreenScrollContainer from "../../components/containers/ScreenScrollContainer";
import TextRegular from "../../components/texts/TextRegular";
import PropertiesGrid from "../../components/properties/PropertiesGrid";

const AllPropertiesScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProperties());
    }, []);

    const properties = useSelector((state) => state.propertySlice.properties);

    return (
        <ScreenScrollContainer>
            <TextRegular style={{ marginBottom: 20 }}>
                Welcome, Landlord!
            </TextRegular>
            <TextRegular style={{ marginBottom: 30, width: 300 }}>
                This the home page that shows all your properties.
            </TextRegular>
            <PropertiesGrid properties={properties} />
        </ScreenScrollContainer>
    );
};

export default AllPropertiesScreen;
