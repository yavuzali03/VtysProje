import {StackNavigator} from "./stackNavigator";
import Icon from "react-native-vector-icons/Octicons";
import {View, StyleSheet, Image, Text} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {useNavigation} from "@react-navigation/native";

export const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType : 'front',
                drawerStyle : {backgroundColor : "#1E2739"},
            }}
            drawerContent = {(props) => <CategoryList {...props} />}
        >
            <Drawer.Screen name="mainScreen" component={()=> <StackNavigator/>} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};


const CategoryList = (props) => {

    const navigation = useNavigation();

    return(
        <DrawerContentScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1}}>

                <View style={{width : "100%" , height : 80 , backgroundColor : "green" , justifyContent : "center" , alignItems : "center"}}>
                    <Text style={{color : "white" , fontSize : 32, fontWeight : "bold"}}>LOGO</Text>
                </View>

                <DrawerItem

                    icon={() => <Icon name={"home"} color={"#F4F6F4"} size={32}/>}
                    labelStyle={styles.labelText}
                    label={"Anasayfa"}

                />

                <DrawerItem
                    onPress={()=>navigation.navigate("filterScreen")}
                    icon={() => <Image source={require("../assets/futbolcu.png")} width={36} height={36}></Image>}
                    labelStyle={styles.labelText}
                    label={"Futbolcu ara"}

                />

                <DrawerItem

                    icon={() => <Icon name={"person"} color={"#F4F6F4"} size={24}/>}
                    labelStyle={styles.labelText}
                    label={"Profil"}

                />

                <DrawerItem

                    icon={() => <Icon name={"gear"} color={"#F4F6F4"} size={24}/>}
                    labelStyle={styles.labelText}
                    label={"Ayarlar"}

                />

            </View>
        </DrawerContentScrollView>

    );
};

const styles = StyleSheet.create({
    labelText : {
        color : "#F4F6F4",
        fontSize : 20,
        fontFamily : "Montserrat-Regular",
        marginStart : -15,
    },
    text : {
        color : "#F4F6F4",
        fontSize : 16 ,
        fontFamily : "Montserrat-Regular",
    },
});
