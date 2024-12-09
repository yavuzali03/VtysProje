import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from "../components/searchBar";

export const SearchingResults = ({ route }) => {
  const { filterResult } = route.params; // "filterResult" parametresi

  // filterResult'ın boş olup olmadığını kontrol ediyoruz
  if (!filterResult || filterResult.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1B212E", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Sonuç bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1B212E", alignItems: "center" }}>
      <SearchBar />

      <FlatList
        data={filterResult}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width: 200, height: 100, backgroundColor: "red", margin: 10 }}>
            <Text style={{ color: "white" }}>Ad: {item.name}</Text>
            <Text style={styles.text}>Pozisyon: {item.position}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
