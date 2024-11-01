import {View, StyleSheet, Text, Dimensions} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Octicons";

export const Details = () => {
  return (
      <View style={{flex : 1, justifyContent: "flex-start" , alignItems :"center" , backgroundColor : "#1B212E" , padding : 50}}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00FF00', '#009C00', '#034103']} style={styles.linearGradient}>
              {/*Buraya futbolcu resmi gelecek*/}
              <View style={{height : 120 , width: 90 , backgroundColor :"blue" , borderRadius : 16}}></View>
              <View style={{marginStart : 15}}>
                  <View style={{flexDirection : "row" , justifyContent : "center" , alignItems : "center"}}>
                      <Text style={styles.playerName}>Futbolcu adı</Text>
                  </View>
              </View>
          </LinearGradient>

          <View style={[styles.borderView , {height: width*0.3}]}>
              <View style={[styles.insideView , {height: width*0.285}]}>
                  <Text style={{fontSize : 50 , color : "white" , fontWeight : "bold"}}>130.00 Mil. €</Text>
              </View>
          </View>

          <View style={styles.borderView}>
              <View style={styles.insideView}></View>
          </View>
      </View>
  )
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    linearGradient : {
        width : width* 0.9,
        height : width * 0.3,
        borderRadius: 20,
        justifyContent : "flex-start",
        alignItems : "center",
        flexDirection : "row",
        padding : 10
    },
    playerName : {
        color: 'white', fontWeight: 'bold', fontSize: 24,
    },
    borderView: {
        backgroundColor: '#00FF00',
        width: width * 0.9,
        height: width,
        borderRadius: 20,
        alignItems: 'center',
        margin : height*0.02,
    },
    insideView: {
        backgroundColor: '#1E2739',
        width: width * 0.885,
        height: width * 0.985,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : "row",
        paddingStart : 15
    },
})
