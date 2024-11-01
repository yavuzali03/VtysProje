import {View, StyleSheet, ScrollView} from "react-native";
import {SearchBar} from "../components/searchBar";
import {PlayerCard} from "../components/playerCard";

export const SearchingResults = () => {
  return(
      <View style={{flex : 1 , backgroundColor : "#1B212E" , alignItems: "center"}}>
          <SearchBar></SearchBar>
          <PlayerCard></PlayerCard>
      </View>
  );
};
const styles = StyleSheet.create({

})
