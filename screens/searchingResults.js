import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from "../components/searchBar";
import {PlayerCard} from '../components/playerCard';
import {useNavigation} from '@react-navigation/native';


export const SearchingResults = ({ route }) => {
  const { filterResult } = route.params; // "filterResult" parametresi
  const navigation = useNavigation();

  // filterResult'ın boş olup olmadığını kontrol ediyoruz
  if (!filterResult || filterResult.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1B212E", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white" }}>Sonuç bulunamadı.</Text>
      </View>
    );
  }


  return (
    <View style={{flex: 1, backgroundColor: '#1B212E', alignItems: 'center'}}>
      <SearchBar />

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={filterResult}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>(
            <PlayerCard name={item.name} club={item.club.name} imageUrl={item.imageURL} marketValue={item.marketValue} id={item.id}></PlayerCard>
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
