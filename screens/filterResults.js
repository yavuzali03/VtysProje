import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from "../components/searchBar";
import {PlayerCard} from '../components/playerCard';
import {useNavigation} from '@react-navigation/native';


export const FilterResults = ({ route }) => {
  const { filterResult } = route.params; // "filterResult" parametresi

  const filterResultArray = Object.values(filterResult);

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
        data={filterResultArray}
        keyExtractor={(item) => item.profile.id}
        renderItem={({item})=>(
            <PlayerCard name={item.profile.name} club={item.profile.club.name} imageUrl={item.profile.imageURL} marketValue={item.market_value.marketValue} id={item.profile.id}></PlayerCard>
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
