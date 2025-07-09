import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import LittleLemonHeader from "./LittleLemonHeader";

const NOTIFICATION_OPTIONS = [
  { key: "orderStatuses", label: "Order statuses" },
  { key: "passwordChanges", label: "Password changes" },
  { key: "specialOffers", label: "Special offers" },
  { key: "newsletter", label: "Newsletter" },
];

const PROFILE_KEYS = ["email", "firstName", "lastName", "phone"];

export default function Profile({ route, navigation }) {
  const { email } = route.params;
  const routing = useRoute();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [initialOptions, setInitialOptions] = useState({});
  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const notifKeys = NOTIFICATION_OPTIONS.map((opt) => opt.key);
        const notifStored = await AsyncStorage.multiGet(notifKeys);
        const notifParsed = notifStored.reduce((acc, [key, value]) => {
          acc[key] = value === "true";
          return acc;
        }, {});
        setSelectedOptions(notifParsed);
        setInitialOptions(notifParsed);

        const profileStored = await AsyncStorage.multiGet(PROFILE_KEYS);
        const profileParsed = profileStored.reduce((acc, [key, value]) => {
          acc[key] = value || "";
          return acc;
        }, {});

        // If values were passed from login screen, use them
        if (route?.params?.email) {
          profileParsed.email = route.params.email;
        }
        if (route?.params?.firstName) {
          profileParsed.firstName = route.params.firstName;
        }
        if (route?.params?.lastName) {
          profileParsed.lastName = route.params.lastName;
        }

        setProfile(profileParsed);
      } catch (e) {
        Alert.alert("Error", `Failed to load data: ${e.message}`);
      }
    };

    loadData();
  }, []);

  const toggleOption = (key) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const notifEntries = Object.entries(selectedOptions).map(([k, v]) => [
        k,
        String(v),
      ]);
      const profileEntries = Object.entries(profile).map(([k, v]) => [k, v]);

      await AsyncStorage.multiSet([...notifEntries, ...profileEntries]);
      setInitialOptions(selectedOptions);
      Alert.alert("Success", "Changes saved.");
    } catch (e) {
      Alert.alert("Error", `Failed to save changes: ${e.message}`);
    }
  };

  const discardChanges = () => {
    setSelectedOptions(initialOptions);
  };

  const logout = () => {
    Alert.alert("Logged out", "You have been logged out.");
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <LittleLemonHeader currentRoute={route.name} />

      <View style={styles.container}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <Text style={styles.subheader}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profile.email}
          editable={false}
        />

        <Text style={styles.subheader}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={profile.firstName}
          onChangeText={(text) => handleProfileChange("firstName", text)}
        />

        <Text style={styles.subheader}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={profile.lastName}
          onChangeText={(text) => handleProfileChange("lastName", text)}
        />

        <Text style={styles.subheader}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={profile.phone}
          onChangeText={(text) => handleProfileChange("phone", text)}
          keyboardType="phone-pad"
        />
        <Text style={styles.header}>Email Notifications</Text>

        {NOTIFICATION_OPTIONS.map(({ key, label }) => (
          <Pressable
            key={key}
            style={styles.option}
            onPress={() => toggleOption(key)}
          >
            <View style={styles.checkbox}>
              {selectedOptions[key] && <View style={styles.checked} />}
            </View>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={discardChanges}
          >
            <Text style={styles.discardText}>Discard Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionHeader: {
    fontFamily: "Karla_400Regular",
    paddingBottom: 15,
    fontSize: 18,
    color: "#333333",
  },
  subheader: {
    fontFamily: "Karla_400Regular",
    fontSize: 14,
    color: "#333333",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "left",
    fontFamily: "Karla_400Regular",
    color: "#333333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  discardButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#495E57",
    borderRadius: 6,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  discardText: {
    color: "#333333",
    fontWeight: "600",
    fontFamily: "Karla_400Regular",
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    backgroundColor: "#495E57",
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Karla_400Regular",
    fontWeight: "bold",
  },

  checked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#333",
  },
  label: {
    fontSize: 16,
    fontFamily: "Karla_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontFamily: "Karla_400Regular",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  logoutButton: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 10,
    backgroundColor: "#F4CE14",
    borderColor: "#F4CE14",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Karla_400Regular",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
