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
import SignUpChoiceScreen from "./src/screens/register/SignupChoiceScreen";
import SignupLandlordInfoScreen from "./src/screens/register/SignupLandlordInfoScreen";
import SignupLandlordPropertyScreen from "./src/screens/register/SignupLandlordPropertyScreen";
import SignupLandlordTenantScreen from "./src/screens/register/SignupLandlordTenantScreen";
import SignupLandlordTenantAccessCodeScreen from "./src/screens/register/SignupLandlordTenantAccessCodeScreen";
import SignupTenantAccessCodeScreen from "./src/screens/register/SignupTenantAccessCodeScreen";
import SignupTenantPropertyLandlordScreen from "./src/screens/register/SignupTenantPropertyLandlordScreen";
import SignupTenantPersonalInfoScreen from "./src/screens/register/SignupTenantPersonalInfoScreen";
import SignupEmailPasswordScreen from "./src/screens/register/SignupEmailPasswordScreen";

// normal screens
import AllPropertiesScreen from "./src/screens/properties/AllPropertiesScreen";

// navigation configs
import { noHeaderConfig } from "./src/navigation-configs/configs";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackComp = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="LoginScreen"
                component={LoginScreen}
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

const Navigator = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(autoSignInAction());
    }, []);

    const idToken = useSelector((state) => state.sessionSlice.idToken);

    let stack;
    if (idToken === "") {
        stack = (
            <RootStack.Screen
                name="AuthStack"
                component={AuthStackComp}
                options={noHeaderConfig}
            />
        );
    } else {
        stack = (
            <RootStack.Screen
                name="AllPropertiesScreen"
                component={AllPropertiesScreen}
                options={noHeaderConfig}
            />
        );
    }
    return (
        <NavigationContainer>
            <RootStack.Navigator>{stack}</RootStack.Navigator>
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
