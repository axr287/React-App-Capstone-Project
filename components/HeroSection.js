import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  useFonts,
  MarkaziText_500Medium,
} from "@expo-google-fonts/markazi-text";
import { Karla_400Regular } from "@expo-google-fonts/karla";

export default function HeroSection() {
  const [fontsLoaded] = useFonts({
    MarkaziText_500Medium,
    Karla_400Regular,
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
        <Text style={styles.body}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.{" "}
        </Text>
      </View>
      <Image
        source={require("../components/ui/heroImage.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#495E57",
    padding: 20,
    //height: "40%", // roughly one-third of the screen
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    fontFamily: "MarkaziText_500Medium",
    fontSize: 32,
    // paddingTop: 50,
    fontWeight: "bold",
    fontSize: 50,
    color: "#F4CE14",
  },
  subtitle: {
    fontFamily: "MarkaziText_500Medium",
    fontSize: 30,
    color: "white",
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 16,
    color: "white",
    marginTop: 8,
    // paddingBottom: 50,
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 10,
    marginLeft: 10,
    height: 100,
    width: 200,
  },
});
