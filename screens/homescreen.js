import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from '../components/searchBar';

export const Homescreen = () => {

  const navigation = useNavigation();

  return (
      <View style={{flex : 1 ,backgroundColor : '#1B212E'}}>
        <SearchBar></SearchBar>
    <ScrollView>
      <View style={styles.container}>

          <TouchableOpacity
              onPress={()=> navigation.navigate()}>
            <View style={styles.borderView}>
              <View style={styles.insideView}>
                <Image
                  source={require('../assets/football-pitch1.png')}
                  height={100}
                  width={100}></Image>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                  Position*
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.borderView}>
              <View style={styles.insideView}>
                <Image
                  source={require('../assets/age1.png')}
                  height={100}
                  width={100}></Image>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                  Age*
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.borderView}>
              <View style={styles.insideView}>
                <Image
                  source={require('../assets/value1.png')}
                  height={100}
                  width={100}></Image>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                  Market Value*
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.borderView}>
              <View style={styles.insideView}>
                <Image
                  source={require('../assets/currentclub.png')}
                  height={100}
                  width={100}></Image>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                  Current Club
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.borderView}>
              <View style={styles.insideView}>
                <Image
                  source={require('../assets/nationalty.png')}
                  height={100}
                  width={100}></Image>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                  Nationality
                </Text>
              </View>
            </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
      </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderView: {
    backgroundColor: '#00FF00',
    width: width * 0.6,
    height: width * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    margin : height*0.02
  },
  insideView: {
    backgroundColor: '#1E2739',
    width: width * 0.58,
    height: width * 0.48,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
