import {View, StyleSheet, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const PlayerCard = ({id,name, club , marketValue , imageUrl}) => {

    const width = Dimensions.get("window").width;
    const navigation = useNavigation();
  return (
    <View style={styles.borderView}>
      <TouchableOpacity onPress={()=>navigation.navigate("details",{id : id})}>
        <View style={styles.insideView}>

              <Image source={{ uri: imageUrl }} style={{
                  height: width*0.26,
                  width: width*0.2,
                  backgroundColor: 'gray',
                  borderRadius: 16,}}></Image>

          <View style={{marginStart: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.playerName}>{name}</Text>

            </View>
            <Text style={styles.playerClub}>{club}</Text>
          </View>
        </View>

        <View style={[styles.price,{display : marketValue ? "hidden" : "none"}]}>
          <Text style={[styles.playerName, {color: 'black', fontSize: 20}]}>{marketValue}</Text>
        </View>

      </TouchableOpacity>
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    borderView: {
        backgroundColor: '#1ef876',
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
        paddingStart : 5,
    },
    playerName : {
        color: 'white', fontWeight: 'bold', fontSize: 24,
    },
    playerClub : {
        color: 'white', fontWeight: 'normal', fontSize: 18,
    },
    price : {
        backgroundColor: '#1ef876',
        width : width*0.3 ,
        height : width*0.11 ,
        elevation : 15 ,
        borderRadius : 12 ,
        position : "absolute" ,
        top : -12 ,
        right: -12 ,
        justifyContent : "center" ,
        alignItems : "center",
        borderWidth : 3,
        borderColor : "#18c65e"
    },
});
