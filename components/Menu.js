import {
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeroSection from "./HeroSection.js";
import LittleLemonHeader from "./LittleLemonHeader.js";
import * as SQLite from "expo-sqlite";
import {
  initializeDatabase,
  getMenuItems,
  createTable,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../database.js";
import { useEffect, useState, useCallback, useMemo } from "react";
import { SectionList, SafeAreaView, StatusBar, Alert } from "react-native";
import { Searchbar } from "react-native-paper";
import debounce from "lodash.debounce";
import Filters from "./Filters.js";
import { getSectionListData, useUpdateEffect } from "../utils.js";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json";
const sections = ["Appetizers", "Salads", "Beverages"];

const Item = ({ title, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
  </View>
);

export default function Menu() {
  const [db, setDb] = useState(null);
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  useEffect(() => {
    (async () => {
      try {
        // 1. Create table if it does not exist
        await initializeDatabase();
        // 2. Check if data was already stored
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          // Fetching menu from URL
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu.map((item) => ({
            ...item,
            category: item.category.title,
          }));
          // Storing into database
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);

        console.log("SectionList data:", sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomHalf}>
        <Searchbar
          placeholder="Search Menu"
          placeholderTextColor="black"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="black"
          inputStyle={{ color: "black" }}
          elevation={0}
        />
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <SectionList
          style={styles.sectionList}
          sections={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item title={item.title} price={item.price} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEFEE",
    backgroundColor: "#495E57",
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: "white",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  topHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  bottomHalf: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
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
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: "black",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: "black",
  },
});
