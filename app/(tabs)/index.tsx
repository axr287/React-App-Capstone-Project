import { View, StyleSheet } from "react-native";
import LittleLemonFooter from "../../components/LittleLemonFooter";
import WelcomeScreen from "../../components/WelcomeScreen";
import LoginScreen from "../../components/LoginScreen";
import Profile from "../../components/Profile";
import {
  NavigationContainer,
  NavigationIndependentTree,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const route = useRoute();
  return (
    <>
      <NavigationIndependentTree>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </View>
          <View style={styles.footerContainer}>
            <LittleLemonFooter />
          </View>
        </NavigationContainer>
      </NavigationIndependentTree>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  footerContainer: { backgroundColor: "#333333" },
});
