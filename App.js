import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// redux
import store from "./src/store/store";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { autoSignInAction } from "./src/store/slices/sessionSlice";

// screens
// auth
import LoginScreen from "./src/screens/auth/LoginScreen";
import PasswordResetScreen from "./src/screens/auth/PasswordResetScreen";
import SignUpChoiceScreen from "./src/screens/register/SignupChoiceScreen";
import SignupLandlordInfoScreen from "./src/screens/register/SignupLandlordInfoScreen";
import SignupLandlordPropertyScreen from "./src/screens/register/SignupLandlordPropertyScreen";
import SignupLandlordTenantScreen from "./src/screens/register/SignupLandlordTenantScreen";
import SignupLandlordTenantAccessCodeScreen from "./src/screens/register/SignupLandlordTenantAccessCodeScreen";
import SignupTenantAccessCodeScreen from "./src/screens/register/SignupTenantAccessCodeScreen";
import SignupTenantPropertyLandlordScreen from "./src/screens/register/SignupTenantPropertyLandlordScreen";
import SignupTenantPersonalInfoScreen from "./src/screens/register/SignupTenantPersonalInfoScreen";
import SignupEmailPasswordScreen from "./src/screens/register/SignupEmailPasswordScreen";

// properties screens
import AllPropertiesScreen from "./src/screens/properties/AllPropertiesScreen";
import AddSinglePropertyScreen1 from "./src/screens/properties/AddSinglePropertyScreen1";
import AddSinglePropertyScreen2 from "./src/screens/properties/AddSinglePropertyScreen2";
import AddSinglePropertyScreen3 from "./src/screens/properties/AddSinglePropertyScreen3";
import EditSinglePropertyScreen from "./src/screens/properties/EditSinglePropertyScreen";

// inquiries screens
import InquiriesScreen from "./src/screens/inquiries/InquiriesScreen";
import AddInquiryScreen from "./src/screens/inquiries/AddInquiryScreen";
import InquiryMessagesScreen from "./src/screens/inquiries/InquiryMessagesScreen";

// user screens
import EditTenantPersonalInfoScreen from "./src/screens/user/EditTenantPersonalInfoScreen";

// navigation configs
import { noHeaderConfig, modalConfig } from "./src/navigation-configs/configs";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const PropertiesStack = createNativeStackNavigator();
const InquiriesStack = createNativeStackNavigator();

const AuthStackComp = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="PasswordResetScreen"
                component={PasswordResetScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignUpChoiceScreen"
                component={SignUpChoiceScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupLandlordInfoScreen"
                component={SignupLandlordInfoScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupLandlordPropertyScreen"
                component={SignupLandlordPropertyScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupLandlordTenantScreen"
                component={SignupLandlordTenantScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupLandlordTenantAccessCodeScreen"
                component={SignupLandlordTenantAccessCodeScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupTenantAccessCodeScreen"
                component={SignupTenantAccessCodeScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupTenantPropertyLandlordScreen"
                component={SignupTenantPropertyLandlordScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupTenantPersonalInfoScreen"
                component={SignupTenantPersonalInfoScreen}
                options={noHeaderConfig}
            />
            <AuthStack.Screen
                name="SignupEmailPasswordScreen"
                component={SignupEmailPasswordScreen}
                options={noHeaderConfig}
            />
        </AuthStack.Navigator>
    );
};

const AddPropertiesStackComp = () => {
    return (
        <PropertiesStack.Navigator>
            <PropertiesStack.Screen
                name="AddSinglePropertyScreen1"
                component={AddSinglePropertyScreen1}
                options={noHeaderConfig}
            />
            <PropertiesStack.Screen
                name="AddSinglePropertyScreen2"
                component={AddSinglePropertyScreen2}
                options={noHeaderConfig}
            />
            <PropertiesStack.Screen
                name="AddSinglePropertyScreen3"
                component={AddSinglePropertyScreen3}
                options={noHeaderConfig}
            />
        </PropertiesStack.Navigator>
    );
};

const InquiriesStackComp = () => {
    return (
        <InquiriesStack.Navigator>
            <InquiriesStack.Screen
                name="InquiriesScreen"
                component={InquiriesScreen}
            />
            <InquiriesStack.Screen
                name="AddInquiryScreen"
                component={AddInquiryScreen}
            />
            <InquiriesStack.Screen
                name="InquiryMessagesScreen"
                component={InquiryMessagesScreen}
            />
        </InquiriesStack.Navigator>
    );
};

const Navigator = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(autoSignInAction());
    }, []);

    const idToken = useSelector((state) => state.sessionSlice.idToken);

    let screens, AddPropertiesStack;
    if (idToken === "") {
        screens = (
            <RootStack.Screen
                name="AuthStack"
                component={AuthStackComp}
                options={noHeaderConfig}
            />
        );
    } else {
        screens = (
            <RootStack.Screen
                name="AllPropertiesScreen"
                component={AllPropertiesScreen}
                options={noHeaderConfig}
            />
        );
        AddPropertiesStack = (
            <RootStack.Screen
                name="AddPropertiesStack"
                component={AddPropertiesStackComp}
                options={noHeaderConfig}
            />
        );
    }
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                {screens}
                {AddPropertiesStack}
                <RootStack.Screen
                    name="EditSinglePropertyScreen"
                    component={EditSinglePropertyScreen}
                    options={noHeaderConfig}
                />
                <RootStack.Screen
                    name="EditTenantPersonalInfoScreen"
                    component={EditTenantPersonalInfoScreen}
                    options={noHeaderConfig}
                />
                <RootStack.Screen
                    name="InquiriesStackComp"
                    component={InquiriesStackComp}
                    options={{ ...modalConfig, ...noHeaderConfig }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <Provider store={store}>
                <Navigator />
            </Provider>
        </>
    );
}
