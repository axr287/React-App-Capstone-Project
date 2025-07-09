import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeroSection from "./HeroSection.js";
import LittleLemonHeader from "./LittleLemonHeader.js";

export default function LoginScreen({ navigation }) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

  const route = useRoute();

  return (
    <ScrollView style={styles.container}>
      <LittleLemonHeader currentRoute={route.name} />
      <HeroSection />

      <Text style={styles.name}>First Name *</Text>
      <TextInput
        style={styles.inputBox}
        value={firstName}
        onChangeText={onChangeFirstName}
        placeholder={"First Name"}
      />

      <Text style={styles.name}>Last Name *</Text>
      <TextInput
        style={styles.inputBox}
        value={lastName}
        onChangeText={onChangeLastName}
        placeholder={"Last Name"}
      />

      <Text style={styles.name}>Email *</Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={"Email"}
        keyboardType={"email-address"}
      />

      <Text style={styles.name}>Password *</Text>
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={onChangePassword}
        placeholder={"Password"}
        secureTextEntry={true}
      />

      <Pressable
        onPress={() =>
          navigation.navigate("Welcome", {
            firstName,
            lastName,
            email,
          })
        }
        style={styles.button}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  regularText: {
    fontSize: 24,
    padding: 15,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 7,
    fontSize: 16,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#EDEFEE",
  },
  button: {
    fontSize: 22,
    padding: 10,
    paddingTop: 10,
    marginVertical: 8,
    margin: 100,
    backgroundColor: "#F4CE14",
    borderColor: "#F4CE14",
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Karla_400Regular",
  },
  name: {
    paddingTop: 5,
    paddingLeft: 10,
    fontFamily: "Karla_400Regular",
    padding: 5,
    color: "gray",
    textAlign: "left",
    fontSize: 20,
  },
});
