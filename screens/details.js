import {View, StyleSheet, Text, Dimensions, Image, ScrollView} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {firebase} from '@react-native-firebase/firestore';
import {SearchBar} from '../components/searchBar';

export const Details = () => {

    const db = firebase.firestore();


  return (
    <ScrollView style={{backgroundColor : "#1B212E" }}>
      <View style={{flex : 1, justifyContent: "flex-start" , alignItems :"center" , backgroundColor : "#1B212E"}}>
          <SearchBar></SearchBar>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00FF00', '#009C00', '#034103']} style={styles.linearGradient}>
              {/*Buraya futbolcu resmi gelecek*/}
              <View style={{height : width*0.24 , width: width*0.18 , backgroundColor :"blue" , borderRadius : 16}}></View>
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
              <View style={[styles.insideView , {flexDirection: "column"}]}>

                  <View style={[styles.infoView , {flexDirection: "column" , alignItems : "center"}]}>
                      <Image source={require("../assets/VTYSicons/birthday-cake.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                      <Text style={styles.text}>22 Haz 1996 (28)</Text>
                  </View>

                  <View style={styles.infoView}>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/house.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>Madrid</Text>
                      </View>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/united-nations.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>İspanya</Text>
                      </View>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/height.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>1,91 m</Text>
                      </View>

                  </View>

                  <View style={styles.infoView}>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/shoe.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>Sağ ayak</Text>
                      </View>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/football-court.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>Orta saha - Ön Libero</Text>
                      </View>

                  </View>

                  <View style={styles.infoView}>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/football-club.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>Manchester
                              City</Text>
                      </View>

                      <View style={{justifyContent : "center" , alignItems : "center"}}>
                          <Image source={require("../assets/VTYSicons/collaboration.png")} style={{width : width*0.1 , height : width*0.1}}></Image>
                          <Text style={styles.text}>30 Haz 2027</Text>
                      </View>

                  </View>

              </View>
          </View>
      </View>
    </ScrollView>
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
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
    },
    text : {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 20,
    },
    infoView : {
        width : "100%" ,
        justifyContent : "space-evenly",
        alignItems : "center",
        height : width*0.245,
        flexDirection : "row" ,
    }
})
