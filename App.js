import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignUpChoiceScreen from "./src/screens/register/SignUpChoiceScreen";

// navigation configs
import { noHeaderConfig } from "./src/navigation-configs/configs";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={noHeaderConfig}
                    />
                    <Stack.Screen
                        name="SignUpChoiceScreen"
                        component={SignUpChoiceScreen}
                        options={noHeaderConfig}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
