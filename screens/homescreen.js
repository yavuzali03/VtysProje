import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from '../components/searchBar';
import {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const Homescreen = () => {

  const navigation = useNavigation();

  const [isPositionPressed, setIsPositionPressed] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null); 
  const [isAgePressed, setIsAgePressed] = useState(false);
  const [isMarketValuePressed, setIsMarketValuePressed] = useState(false);
  const [minMarketValue, setMinMarketValue] = useState(0);
  const [maxMarketValue, setMaxMarketValue] = useState(0);
  const [minAgetValue, setMinAgeValue] = useState(0);
  const [maxAgetValue, setMaxAgeValue] = useState(0);

  return (
      <View style={{flex : 1 ,backgroundColor : '#1B212E'}}>
        <SearchBar></SearchBar>
    <ScrollView>
      <View style={styles.container}>

          <TouchableOpacity
              onPress={()=>setIsPositionPressed(!isPositionPressed)}>
            {isPositionPressed ? (
                <View style={styles.borderView}>
               <View style={styles.insideView}>
                  <Image
                    style={{ opacity: 0.1, width: width * 0.55, height: width * 0.5 }}
                    source={require("../assets/football-pitch1.png")}
                    resizeMode={"stretch"}
                  />
                  <View style={{ position: "absolute" }}>
                    <TouchableOpacity onPress={() => setSelectedPosition("Goalkeeper")}>
                      <Text
                        style={{
                          color: selectedPosition === "Goalkeeper" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Goalkeeper
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedPosition("Right back")}>
                      <Text
                        style={{
                          color: selectedPosition === "Right back" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Right back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedPosition("Left back")}>
                      <Text
                        style={{
                          color: selectedPosition === "Left back" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Left back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedPosition("Stopper")}>
                      <Text
                        style={{
                          color: selectedPosition === "Stopper" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Stopper
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedPosition("Midfielder")}>
                      <Text
                        style={{
                          color: selectedPosition === "Midfielder" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Midfielder
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedPosition("Forward")}>
                      <Text
                        style={{
                          color: selectedPosition === "Forward" ? "#00FF00" : "white",
                          fontSize: 25,
                        }}
                      >
                        Forward
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.borderView}>
                <View style={styles.insideView}>
                  <Image
                    source={require("../assets/football-pitch1.png")}
                    height={100}
                    width={100}
                  />
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
                    Position*
                  </Text>
                </View>
            </View>)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setIsAgePressed(!isAgePressed)}>{
            isAgePressed ? (<View style={styles.borderView}>
                    <View style={styles.insideView}>
                      <Image
                          style={{opacity : 0.1 , width : width*0.55 , height : width*0.5}}
                          source={require('../assets/age1.png')}
                          resizeMode={'stretch'}
                      ></Image>
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
                    </View>
                    </View>
                ) :
                (<View style={styles.borderView}>
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
            </View>)
          }

          </TouchableOpacity>

          <TouchableOpacity onPress={()=> setIsMarketValuePressed(!isMarketValuePressed)}>{
            isMarketValuePressed ? (
                <View style={styles.borderView}>
                  <View style={styles.insideView}>
                    <Image
                        style={{opacity : 0.1 , width : width*0.55 , height : width*0.5}}
                        source={require('../assets/value1.png')}
                        resizeMode={'stretch'}
                    ></Image>
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
                  </View>
                </View>) :
                (<View style={styles.borderView}>
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
            </View>)
          }

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
    backgroundColor : "#00FF00" ,
    width : width*0.5 ,
    height : 36 ,
    borderRadius : 18,
    justifyContent : "center",
    alignItems : "center",
    flexDirection : "row",
  },
  textInput: {
    backgroundColor : "#00FF00" ,
    width : 100 ,
    height : 40 ,
    borderRadius : 16 ,
    justifyContent : "center" ,
    alignItems : "center" ,
    marginTop : 16,
  },
  selectedPosition: {
    backgroundColor: "#00FF00", 
  },
});
