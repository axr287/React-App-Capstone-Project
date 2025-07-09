import {
  Text,
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeroSection from "./HeroSection.js";
import LittleLemonHeader from "./LittleLemonHeader.js";
import Menu from "./Menu.js";

export default function WelcomeScreen({ navigation, route }) {
  const { email } = route.params || {};
  const routing = useRoute();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LittleLemonHeader currentRoute={routing.name} />
      <HeroSection />
      <Menu />
      <Pressable
        onPress={() => navigation.navigate("Profile", { email })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },

  searchBar: {
    marginBottom: 24,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Karla_400Regular",
  },
  headerText: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  button: {
    fontSize: 22,
    padding: 10,
    paddingTop: 15,
    marginVertical: 8,
    margin: 100,
    backgroundColor: "#F4CE14",
    borderColor: "#F4CE14",
    borderWidth: 2,
    borderRadius: 50,
  },
});
