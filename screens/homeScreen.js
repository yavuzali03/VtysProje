import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {SearchBar} from '../components/searchBar';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenData} from '../api/homeScreenData';
import LoadingScreen from './loadingScreen';


export const HomeScreen = () => {

  const [topPlayer, setTopPlayer] = useState([]);
  const [mostLikedPlayer, setMostLikedPlayer] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    HomeScreenData.getTopPlayerData(setTopPlayer , setLoading);
    HomeScreenData.getMostLikedPlayerData(setMostLikedPlayer);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
    </View>
  );

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#1B212E'}}>
      <SearchBar></SearchBar>
      <ScrollView>
        <View style={styles.container}>

        <TouchableOpacity
          style={{marginBottom : 20,marginTop:width*0.14,}}
          onPress={() => navigation.navigate("details" , {id : topPlayer.player_id})}>

          <View style={styles.itemContainer}>

            <View style={[styles.itemContainer , {height: width*0.45 }]}>
              <Image source={require("../assets/background.png")} style={styles.image}></Image>
              <Image
                source={{uri: topPlayer.image_url}} b
                style={styles.playerBackground}></Image>
              <Image
                source={{uri: topPlayer.image_url}}
                style={styles.image}/>
            </View>
              <View style={styles.textContainer}>

                <Text style={styles.labelText}>En Çok Ziyaret Edilen Oyuncu</Text>
                <Text style={styles.playerName}>{topPlayer.player_name}</Text>
              </View>

           </View>

        </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("details" , {id : mostLikedPlayer.player_id})}>

            <View style={styles.itemContainer}>

              <View style={[styles.itemContainer , {height: width*0.45 }]}>
                <Image source={require("../assets/background.png")} style={styles.image}></Image>
                <Image
                  source={{uri: mostLikedPlayer.image_url}} b
                  style={styles.playerBackground}></Image>
                <Image
                  source={{uri: mostLikedPlayer.image_url}}
                  style={styles.image}/>
              </View>
              <View style={styles.textContainer}>

                <Text style={styles.labelText}>En Çok Beğenilen Oyuncu</Text>
                <Text style={styles.playerName}>{mostLikedPlayer.player_name}</Text>
              </View>

            </View>

          </TouchableOpacity>

        {/*
          <Carousel
            data={[topPlayer]}
            renderItem={renderItem}
            width={sliderWidth}
            height={200}
            loop
          />
        */}
        </View>
      </ScrollView>
    </View>
  );
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width*0.8,
    height: width*0.45,
    resizeMode: 'contain',
    position : "absolute",
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor : "#1E2739",
    width: width*0.8,
    height: width*0.7,
    borderRadius : 20
  },
  labelText : {
    color : "white"
  },
  playerName : {
    fontWeight : "bold" ,
    fontSize : 30 ,
    color : "white"
  },
  textContainer: {
    width : "100%",
    height : width*0.25 ,
    justifyContent: "center",
    alignItems: "center" ,
  },
  playerBackground : {
    width: width*0.8,
    height: width*0.45,
    resizeMode : "strech" ,
    position : "absolute" ,
    opacity : 0.4
  }
});
