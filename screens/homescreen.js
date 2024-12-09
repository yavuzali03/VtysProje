import {useNavigation} from '@react-navigation/native';
import {
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


export const Homescreen = () => {

  const navigation = useNavigation();

  const [isPositionPressed, setIsPositionPressed] = useState(false);
  const [isAgePressed, setIsAgePressed] = useState(false);
  const [isMarketValuePressed, setIsMarketValuePressed] = useState(false);
  const [isNationalityPressed, setIsNationalityPressed] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const [minMarketValue, setMinMarketValue] = useState(0);
  const [maxMarketValue, setMaxMarketValue] = useState(0);

  const [minAgetValue, setMinAgeValue] = useState(0);
  const [maxAgetValue, setMaxAgeValue] = useState(0);

  const [filterResult, setFilterResult] = useState([]);

  const [value, setValue] = useState([]);

  const data = [
    { label: 'Item 1', value: '1' },
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
    { label: 'Attacking Midfield', value: '2' },
    { label: 'Left Winger', value: '3' },
    { label: 'Right Winger', value: '4' },
    { label: 'Centre-Forward', value: '5' },
    { label: 'Centre-Back', value: '6' },
    { label: 'Defensive Midfield', value: '7' },
    { label: 'Central Midfield', value: '8' },
    { label: 'Second Striker', value: '9' },
    { label: 'Right-Back', value: '10' },
    { label: 'Left-Back', value: '11' },
    { label: 'Sweeper', value: '12' },
    { label: 'Left Midfield', value: '13' },
    { label: 'Right Midfield', value: '14' },

  ];




console.log(selectedPosition);

  const fetchFilteredData = async () => {
    if (!selectedPosition) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const response = await fetch(`http://44.195.206.105/players/by_filters?position=${selectedPosition}`);
      const data = await response.json();
      setFilterResult(data); // Veriyi state'e kaydediyoruz
    } catch (error) {
      console.error('API çağrısı hatası:', error);
      alert('Veri çekilirken bir hata oluştu.');
    }
  };


  console.log(filterResult);


  return (
   <View style={{flex : 1 ,backgroundColor : '#1B212E'}}>
        <SearchBar></SearchBar>
    <ScrollView>
      <View style={styles.container}>

        <TouchableOpacity onPress={fetchFilteredData}>
          <View style={{width : 200 , height : 100 , backgroundColor : "gray" , justifyContent : "center", alignItems : "center"}}>
            <Text style={{color :"white", fontSize :30,fontWeight : "bold"}}>BUTON</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("searchingResults", { filterResult })}>
          <View style={{width : 200 , height : 100 , backgroundColor : "gray" , justifyContent : "center", alignItems : "center"}}>
            <Text style={{color :"white", fontSize :30,fontWeight : "bold"}}>ATTIR</Text>
          </View>
        </TouchableOpacity>

        <FilterCard Label={"Positions*"} ImageName={require("../assets/football-pitch1.png")} isStatus={isPositionPressed} setIsStatus={setIsPositionPressed}>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={positions}
              itemTextStyle={{color : "black" , fontSize : 20 , padding : 5}}

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




        <FilterCard Label={"Age*"} ImageName={require("../assets/age1.png")} isStatus={isAgePressed} setIsStatus={setIsAgePressed}>

          <View style={{width : 50 , position : "absolute",  justifyContent : "space-around" ,alignItems : "center"}}>
            <View style={{flexDirection : "row"}}>
              <View style={[styles.textInputView , {width: 80}]}>
                <TextInput
                    style={{ width : 60 , height : 35 , fontWeight : "bold" , fontSize : 20 , padding : 5 , color : "black"}}
                    keyboardType={"numeric"}
                    maxLength={2}
                    value={minAgetValue}
                    onChangeText={(text)=>setMinAgeValue(text)}
                    placeholder={"min"}
                />
              </View>
              <Text style={{color :"white" , fontSize :28}}>-</Text>
              <View style={[styles.textInputView ,{width: 80}]}>
                <TextInput
                    style={{ width : 60 , height : 35 , fontWeight : "bold" , fontSize : 20 , padding : 5 , color : "black"}}
                    keyboardType={"numeric"}
                    maxLength={2}
                    value={maxAgetValue}
                    onChangeText={(text)=>setMaxAgeValue(text)}
                    placeholder={"max"}
                />
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.textInput}>
                <Text style={{color :"black" , fontSize :24}}>Okey</Text>
              </View>
            </TouchableOpacity>

          </View>
        </FilterCard>

          <FilterCard Label={"Market Value*"} ImageName={require("../assets/value1.png")} isStatus={isMarketValuePressed} setIsStatus={setIsMarketValuePressed}>
            <View style={{width : 50 , position : "absolute",  justifyContent : "space-around" ,alignItems : "center"}}>
              <View style={styles.textInputView}>
                <TextInput
                    style={{ width : 150 , height : 35 , fontWeight : "bold" , fontSize : 20 , padding : 5 , color : "black"}}
                    keyboardType={"numeric"}
                    value={minMarketValue}
                    maxLength={9}
                    onChangeText={(text)=>setMinMarketValue(text)}
                    placeholder={"min"}
                />
                <Icon name={"euro"} color={"#1E2739"} size={24}></Icon>
              </View>
              <Text style={{color :"white" , fontSize :28}}>to</Text>
              <View style={styles.textInputView}>
                <TextInput
                    style={{ width : 150 , height : 35 , fontWeight : "bold" , fontSize : 20 , padding : 5 , color : "black"}}
                    keyboardType={"numeric"}
                    value={maxMarketValue}
                    maxLength={9}
                    onChangeText={(text)=>setMaxMarketValue(text)}
                    placeholder={"max"}
                />
                <Icon name={"euro"} color={"#1E2739"} size={24}></Icon>
              </View>
              <TouchableOpacity>
                <View style={styles.textInput}>
                  <Text style={{color :"black" , fontSize :24}}>Okey</Text>
                </View>
              </TouchableOpacity>
            </View>
          </FilterCard>

          <FilterCard Label={"Nationality"} ImageName={require('../assets/nationality.png')} isStatus={isNationalityPressed} setIsStatus={setIsNationalityPressed} >

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              itemTextStyle={{color : "black" , fontSize : 20 , padding : 5}}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <Icon style={styles.icon} color="black" name="eye" size={20} />
              )}
            />

          </FilterCard>
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
    backgroundColor: '#1ef876',
    width: width * 0.6,
    height: width * 0.5,
    borderRadius: 20,
    alignItems: 'center',
    margin : height*0.02,
  },
  insideView: {
    backgroundColor: '#1E2739',
    width: width * 0.58,
    height: width * 0.48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});
