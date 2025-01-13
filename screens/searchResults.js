import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from "../components/searchBar";
import {PlayerCard} from '../components/playerCard';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import LoadingScreen from './loadingScreen';
import {SearchResultsData} from '../api/searchResultsData';


export const SearchResults = ({route}) => {

  const {searchValue} = route.params;

  const [loading, setLoading] = useState(true);

  const [playersData, setPlayersData] = useState(null);

  useEffect(() => {
    SearchResultsData(searchValue,setPlayersData,setLoading);
  }, [searchValue]);

  if (loading) {
    return(
      <LoadingScreen></LoadingScreen>
    );
  }
  if (!playersData || playersData.length === 0 || playersData.hasOwnProperty("error") || Object.keys(playersData).length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1B212E',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <SearchBar icon={"chevron-left"}></SearchBar>
        <Text style={styles.text}>Sonuç bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#1B212E', alignItems: 'center'}}>
      <SearchBar icon={"chevron-left"}></SearchBar>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={playersData}
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
