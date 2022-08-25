import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import LoginScreen from "./src/screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
