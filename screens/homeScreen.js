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
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    HomeScreenData(setTopPlayer , setLoading);
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

        <TouchableOpacity onPress={() => navigation.navigate("details" , {id : topPlayer.player_id})}>

          <View style={styles.itemContainer}>

            <View style={[styles.itemContainer , {height: width*0.45 }]}>
              <Image source={require("../assets/background.png")} style={[styles.image]}></Image>
              <Image
                source={{uri: topPlayer.image_url}} b
                style={{width: width*0.8, height: width*0.45, resizeMode : "strech" , position : "absolute" , opacity : 0.4}}></Image>
              <Image
                source={{uri: topPlayer.image_url}}
                style={styles.image}></Image>
            </View>
              <View style={{width : "100%",height : width*0.25 ,justifyContent: "center", alignItems: "center" ,}}>

                <Text style={{color : "white"}}>En Çok Ziyaret Edilen Oyuncu</Text>
                <Text style={{fontWeight : "bold" , fontSize : 30 , color : "white"}}>{topPlayer.player_name}</Text>
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
});
