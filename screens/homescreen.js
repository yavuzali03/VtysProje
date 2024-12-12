import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from '../components/searchBar';
import {useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import {FilterCard} from "../components/filterCard";
import {Dropdown} from 'react-native-element-dropdown';
import LoadingScreen from './loadingScreen';
import {enableExperimentalWebImplementation} from 'react-native-gesture-handler';


export const Homescreen = () => {

  const navigation = useNavigation();
  const [loading , setLoading] = useState(false);

  const [isPositionPressed, setIsPositionPressed] = useState(false);
  const [isAgePressed, setIsAgePressed] = useState(false);
  const [isMarketValuePressed, setIsMarketValuePressed] = useState(false);
  const [isNationalityPressed, setIsNationalityPressed] = useState(false);
  const [isFootPressed, setIsFootPressed] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const [minMarketValue, setMinMarketValue] = useState(0);
  const [maxMarketValue, setMaxMarketValue] = useState(0);

  const [minAgeValue, setMinAgeValue] = useState(0);
  const [maxAgeValue, setMaxAgeValue] = useState(0);

  const [selectedNationality , setSelectedNationality] = useState(null);

  const [selectedFoot, setSelectedFoot] = useState(null);

  const [filterResult, setFilterResult] = useState([]);


  const nationality = [
    { label: 'Türkiye', value: 'Türkiye' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const positions = [
    { label: 'Kaleci', value: 'Goalkeeper' },
    { label: 'Stoper', value: 'Centre-Back' },
    { label: 'Sağ Bek', value: 'Right-Back' },
    { label: 'Sol Bek', value: 'Left-Back' },
    { label: 'Defansif Orta Saha', value: 'Defensive Midfield' },
    { label: 'Merkezi Orta Saha', value: 'Central Midfield' },
    { label: 'Hücumcu Orta Saha', value: 'Attacking Midfield' },
    { label: 'Sol Orta Saha', value: 'Left Midfield' },
    { label: 'Sağ Orta Saha', value: 'Right Midfield' },
    { label: 'Sol Kanat', value: 'Left Winger' },
    { label: 'Sağ Kanat', value: 'Right Winger' },
    { label: 'Merkez Forvet', value: 'Centre-Forward' },
    { label: 'Gizli Forvet', value: 'Second Striker' },
  ];

  const foot = [
    { label: 'Sağ', value: 'right' },
    { label: 'Sol', value: 'left' },
  ];


  console.log("pozisyon = "+selectedPosition);
  console.log("min yaş = "+minAgeValue);
  console.log("max yaş = "+maxAgeValue);
  console.log("min market = "+minMarketValue);
  console.log("max market = "+maxMarketValue);
  console.log("ülke = "+selectedNationality);
  console.log("ayak = "+selectedFoot);


  const baseUrl = 'http://44.195.206.105/players/by_filters';

  const params = {
    position: selectedPosition,
    min_age : minAgeValue,
    max_age : maxAgeValue,
    minMarketValue : minMarketValue,
    maxMarketValue : maxMarketValue,
    nationality: selectedNationality ,
    foot: selectedFoot,
  };

  const buildApiUrl = (baseUrl, params) => {
    const query = Object.keys(params)
      .filter((key) => {
        const value = params[key];
        return value !== undefined && value !== null && value !== '' && value.toString().trim() !== "0"; // Ekstra boşlukları da kontrol et
      })
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`) // Parametreleri encode et
      .join('&'); // Parametreleri '&' ile birleştir

    return query ? `${baseUrl}?${query}` : baseUrl; // Eğer parametre yoksa sadece baseUrl döner
  };

  const fetchApiData = async (baseUrl, params) => {
    try {
      const apiUrl = buildApiUrl(baseUrl, params); // Dinamik URL oluştur
      console.log('API URL:', apiUrl); // Kontrol amaçlı

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP hata kodu: ${response.status}`);
      }
      const data = await response.json();
      setFilterResult(data);


    } catch (error) {
      console.error('API çağrısı hatası:', error);
    }
  };

  const filtrele = () => {
    if (selectedPosition === null && selectedNationality === null && selectedFoot == null && minAgeValue === 0 && maxAgeValue=== 0 && minMarketValue === 0 && maxMarketValue === 0)
    {
    Alert.alert("Uyarı","Lütfen bir seçim yapınız.",[{text : "tamam"}]);
   }else {
    fetchApiData(baseUrl,params);
    }
  };

  useEffect(() => {
    console.log('API Data güncellendi:', filterResult);
    if (filterResult.length > 0) {
      navigation.navigate("searchingResults",{filterResult : filterResult});
      setSelectedPosition(null);
      setSelectedFoot(null);
      setSelectedNationality(null);
      setMinAgeValue(0);
      setMaxAgeValue(0);
      setMinMarketValue(0);
      setMaxMarketValue(0);
    }
  }, [filterResult]);




  return (
    <View style={{flex: 1, backgroundColor: '#1B212E'}}>
      <SearchBar></SearchBar>
      <ScrollView>
        <View style={styles.container}>
          <FilterCard
            Label={'Pozisyon'}
            ImageName={require('../assets/football-pitch1.png')}
            isStatus={isPositionPressed}
            setIsStatus={setIsPositionPressed}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={positions}
              itemTextStyle={{color: 'black', fontSize: 20, padding: 5}}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              value={selectedPosition}
              onChange={item => {
                setSelectedPosition(item.value);

              }}
              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="eye" size={20} />
              )}
            />
          </FilterCard>

          <FilterCard
            Label={'Age*'}
            ImageName={require('../assets/age1.png')}
            isStatus={isAgePressed}
            setIsStatus={setIsAgePressed}>
            <View
              style={{
                width: 50,
                position: 'absolute',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.textInputView, {width: 80}]}>
                  <TextInput
                    style={{
                      width: 60,
                      height: 35,
                      fontWeight: 'bold',
                      fontSize: 20,
                      padding: 5,
                      color: 'black',
                    }}
                    keyboardType={'numeric'}
                    maxLength={2}
                    value={minAgeValue}
                    onChangeText={text => setMinAgeValue(text)}
                    placeholder={'min'}
                  />
                </View>
                <Text style={{color: 'white', fontSize: 28}}>-</Text>
                <View style={[styles.textInputView, {width: 80}]}>
                  <TextInput
                    style={{
                      width: 60,
                      height: 35,
                      fontWeight: 'bold',
                      fontSize: 20,
                      padding: 5,
                      color: 'black',
                    }}
                    keyboardType={'numeric'}
                    maxLength={2}
                    value={maxAgeValue}
                    onChangeText={text => setMaxAgeValue(text)}
                    placeholder={'max'}
                  />
                </View>
              </View>
              <TouchableOpacity>
                <View style={styles.textInput}>
                  <Text style={{color: 'black', fontSize: 24}}>Okey</Text>
                </View>
              </TouchableOpacity>
            </View>
          </FilterCard>

          <FilterCard
            Label={'Market Value*'}
            ImageName={require('../assets/value1.png')}
            isStatus={isMarketValuePressed}
            setIsStatus={setIsMarketValuePressed}>
            <View
              style={{
                width: 50,
                position: 'absolute',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={styles.textInputView}>
                <TextInput
                  style={{
                    width: 150,
                    height: 35,
                    fontWeight: 'bold',
                    fontSize: 20,
                    padding: 5,
                    color: 'black',
                  }}
                  keyboardType={'numeric'}
                  value={minMarketValue}
                  maxLength={9}
                  onChangeText={text => setMinMarketValue(text)}
                  placeholder={'min'}
                />
                <Icon name={'euro'} color={'#1E2739'} size={24}></Icon>
              </View>
              <Text style={{color: 'white', fontSize: 28}}>to</Text>
              <View style={styles.textInputView}>
                <TextInput
                  style={{
                    width: 150,
                    height: 35,
                    fontWeight: 'bold',
                    fontSize: 20,
                    padding: 5,
                    color: 'black',
                  }}
                  keyboardType={'numeric'}
                  value={maxMarketValue}
                  maxLength={9}
                  onChangeText={text => setMaxMarketValue(text)}
                  placeholder={'max'}
                />
                <Icon name={'euro'} color={'#1E2739'} size={24}></Icon>
              </View>
              <TouchableOpacity>
                <View style={styles.textInput}>
                  <Text style={{color: 'black', fontSize: 24}}>Okey</Text>
                </View>
              </TouchableOpacity>
            </View>
          </FilterCard>

          <FilterCard
            Label={'Nationality'}
            ImageName={require('../assets/nationality.png')}
            isStatus={isNationalityPressed}
            setIsStatus={setIsNationalityPressed}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={nationality}
              itemTextStyle={{color: 'black', fontSize: 20, padding: 5}}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selectedNationality}
              onChange={item => {
                setSelectedNationality(item.value);
              }}

              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="eye" size={20} />
              )}
            />
          </FilterCard>

          <FilterCard
            Label={'Tercih edilen ayak'}
            ImageName={require('../assets/foot.png')}
            isStatus={isFootPressed}
            setIsStatus={setIsFootPressed}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={foot}
              itemTextStyle={{color: 'black', fontSize: 20, padding: 5}}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              value={selectedFoot}
              onChange={item => {
                setSelectedFoot(item.value);
              }}
              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="eye" size={20} />
              )}
            />
          </FilterCard>

          <TouchableOpacity
            onPress={()=>filtrele()}>
            <View style={styles.insideView}>
              <Text style={styles.text}>FİLTRELE</Text>
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
  insideView: {
    backgroundColor: '#1E2739',
    width: width * 0.68,
    height: width * 0.18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth : width*0.012,
    borderColor : "#1ef876",
    margin : width*0.05,
  },
  textInputView : {
    backgroundColor : "#1ef876" ,
    width : width*0.5 ,
    height : 36 ,
    borderRadius : 18,
    justifyContent : "center",
    alignItems : "center",
    flexDirection : "row",
  },
  textInput: {
    backgroundColor : "#1ef876" ,
    width : 100 ,
    height : 40 ,
    borderRadius : 16 ,
    justifyContent : "center" ,
    alignItems : "center" ,
    marginTop : 16,
  },
  selectedPosition: {
    backgroundColor: "#1ef876",
  },
  dropdown: {
    margin: 16,
    height: 50,
    width : 180,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    position : "absolute",
    backgroundColor : "white"
  },
  icon: {
    marginRight: 5,
    marginLeft : 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color : "black"
  },
  selectedTextStyle: {
    fontSize: 16,
    color : "black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color : "black"
  },
  text :{
    color : "white",
    fontSize : width*0.08,
    fontWeight : "bold",
  },
});
