import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from "../components/searchBar";
import {PlayerCard} from '../components/playerCard';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import LoadingScreen from './loadingScreen';


export const SearchResults = ({route }) => {

  const {searchValue} = route.params;

  const [loading, setLoading] = useState(true);

  const [playersData, setPlayersData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://44.195.206.105/players/by-name?name=${searchValue}`,
        );
        const json = await response.json();
        setPlayersData(json);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue]);

  if (loading) {
    return(
      <LoadingScreen></LoadingScreen>
    )
  }

  if (!playersData || playersData.length === 0 || playersData.hasOwnProperty("error")) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1B212E',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <SearchBar></SearchBar>
        <Text style={styles.text}>Sonuç bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#1B212E', alignItems: 'center'}}>
      <SearchBar></SearchBar>
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
