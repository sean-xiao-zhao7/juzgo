import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens

// auth
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignUpChoiceScreen from "./src/screens/register/SignupChoiceScreen";
import SignupLandlordInfoScreen from "./src/screens/register/SignupLandlordInfoScreen";
import SignupLandlordPropertyScreen from "./src/screens/register/SignupLandlordPropertyScreen";
import SignupLandlordTenantScreen from "./src/screens/register/SignupLandlordTenantScreen";
import SignupLandlordTenantAccessCodeScreen from "./src/screens/register/SignupLandlordTenantAccessCodeScreen";
import SignupTenantAccessCodeScreen from "./src/screens/register/SignupTenantAccessCodeScreen";

// normal screens
import AllPropertiesScreen from "./src/screens/AllPropertiesScreen";

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
        </AuthStack.Navigator>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="AuthStack"
                        component={AuthStackComp}
                        options={noHeaderConfig}
                    />
                    <RootStack.Screen
                        name="AllPropertiesScreen"
                        component={AllPropertiesScreen}
                        options={noHeaderConfig}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
}
