import { useNavigation } from "expo-router";
import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function LittleLemonHeader({ currentRoute }) {
  const navigation = useNavigation();
  const showBackButton = currentRoute === "Profile";
  const showProfileButton = currentRoute === "Welcome Screen";
  return (
    <SafeAreaView style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Icon name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
      )}

      {showProfileButton && (
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="person-circle-outline" size={30} color="#495E57" />
        </TouchableOpacity>
      )}

      <Image
        source={require("../../LittleLemon/components/ui/header.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },

  profileButton: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 1,
    backgroundColor: "#EDEFEE",
    borderRadius: 20,
    padding: 5,
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 1,
    backgroundColor: "#495E57",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },

  logo: {
    paddingTop: 30,
    width: 200,
    height: 100,
  },
});
