import {View, StyleSheet, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import {useNavigation} from "@react-navigation/native";

export const BottomBar = () => {

    const navigation = useNavigation();

  return(
      <View style={styles.borderView} >
          <View style={styles.insideView}>

              <TouchableOpacity onPress={()=> navigation.navigate("home")}>
            <Icon name={"home"} color={"white"} size={36}></Icon>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigation.navigate("player")}>
                  <Image source={require("../assets/futbolcu.png")} width={36} height={36}></Image>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigation.navigate("profile")}>
                  <Icon name={"person"} color={"white"} size={36}></Icon>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> navigation.navigate("settings")}>
                  <Icon name={"gear"} color={"white"} size={36}></Icon>
              </TouchableOpacity>

          </View>
      </View>
  )
}


const styles = StyleSheet.create({
    borderView :{
        width:'100%' , height:90 , backgroundColor:'#1ef876' , borderTopStartRadius: 20, borderTopEndRadius : 20 , justifyContent:'flex-end', alignItems: 'center',
    },
    insideView : {
        width:'100%' , height : 80 , backgroundColor : "#1E2739", borderTopStartRadius: 20, borderTopEndRadius : 20 , justifyContent:'space-evenly', alignItems: 'center',flexDirection : "row"
    }
})
