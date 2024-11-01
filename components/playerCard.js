import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

export const PlayerCard = () => {
  return(
      <View style={styles.borderView}>
          <TouchableOpacity>
          <View style={styles.insideView}>
              {/*Buraya futbolcu resmi gelecek*/}
              <View style={{height : 100 , width: 80 , backgroundColor :"green" , borderRadius : 16}}></View>
              <View style={{marginStart : 15}}>
                  <View style={{flexDirection : "row" , justifyContent : "center" , alignItems : "center"}}>
                      <Text style={styles.playerName}>Futbolcu adı</Text>
                      <Icon name={"file-directory"} color={"red"} size={24} style={{marginStart : 15}}></Icon>
                  </View>
                  <Text style={styles.playerClub}>Kulüp adı</Text>
              </View>
          </View>
          <View style={styles.price}>
              <Text style={[styles.playerName ,{color: "black"}]}>130 mil. €</Text>
          </View>
          </TouchableOpacity>
      </View>

  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    borderView: {
        backgroundColor: '#00FF00',
        width: width * 0.9,
        height: width * 0.3,
        borderRadius: 20,
        alignItems: 'center',
        margin : height*0.02,
    },
    insideView: {
        backgroundColor: '#1E2739',
        width: width * 0.885,
        height: width * 0.285,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection : "row",
        paddingStart : 15
    },
    playerName : {
        color: 'white', fontWeight: 'bold', fontSize: 24,
    },
    playerClub : {
        color: 'white', fontWeight: 'normal', fontSize: 18,
    },
    price : {
        backgroundColor: '#00FF00',
        width : 153 ,
        height : 39 ,
        elevation : 15 ,
        borderRadius : 12 ,
        position : "absolute" ,
        top : -10 ,
        right: -10 ,
        justifyContent : "center" ,
        alignItems : "center",
        borderWidth : 3,
        borderColor : "#00cc00"
    },
});
