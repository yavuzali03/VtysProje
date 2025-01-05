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
import {PositionValue} from '../data/positionValue';
import {FootValue} from '../data/footValue';
import {CountryValue} from '../data/countryValue';


export const FilterScreen = () => {

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

  const [filterResult, setFilterResult] = useState(null);


  const nationality = new CountryValue().country;

  const positions = new PositionValue().positions;
  const foot = new FootValue().foots;


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
      setLoading(true);
    fetchApiData(baseUrl,params);
    }
  };

  useEffect(() => {
    if (filterResult !== null) {
      navigation.navigate("filterResults",{filterResult : filterResult});
      setFilterResult(null);
      setSelectedPosition(null);
      setSelectedFoot(null);
      setSelectedNationality(null);
      setMinAgeValue(0);
      setMaxAgeValue(0);
      setMinMarketValue(0);
      setMaxMarketValue(0);
      setLoading(false);
    }
  }, [filterResult]);

  if (loading){
    return(
      <LoadingScreen/>
    )
  }


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
              placeholder="Pozisyon seçin"
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
              placeholder="Ülke seçin"
              searchPlaceholder="Ülke ara"
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
              placeholder="Tercih edilen ayak"
              value={selectedFoot}
              onChange={item => {
                setSelectedFoot(item.value);
              }}
              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="eye" size={20} />
              )}
            />
          </FilterCard>

        </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center' , width: '100%' ,  height : width*0.22}}>
        <TouchableOpacity
          onPress={()=>filtrele()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>FİLTRELE</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  button: {
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
  buttonText: {
    color : "white",
    fontSize: 24,
    fontWeight: 'bold',
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
