import {StackNavigator} from "./stackNavigator";
import {View, StyleSheet, Text, Image} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType : 'front',
                drawerStyle : {backgroundColor : "#1E2739"},
              drawerLabelStyle: {
                color: 'white',
              },
            }}
            drawerContent = {(props) => <CategoryList {...props} />}
        >
            <Drawer.Screen name="mainScreen" component={()=> <StackNavigator/>} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};


const CategoryList = (props) => {
    const { navigation} = props;

    return (
      <DrawerContentScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
              {/* Logo Bölümü */}
              <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' , padding : 30}}>
                  <Image source={require("../assets/logogenis.png")} resizeMode={"contain"} style={{width: '100%', height: 80,}}></Image>
              </View>

              {/* DrawerItem'lar */}
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons
                    name="home"
                    color={'#F4F6F4'}
                    size={32}
                  />
                )}
                label="Anasayfa"
                labelStyle={{
                    ...styles.labelText,
                    color :'#F4F6F4',
                }}
                onPress={() => navigation.navigate('home')}
              />

              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons
                    name="account-filter"
                    color={'#F4F6F4'}
                    size={32}
                  />
                )}
                label="Futbolcu ara"
                labelStyle={{
                    ...styles.labelText,
                    color:'#F4F6F4',
                }}
                onPress={() => navigation.navigate('filterScreen')}
              />

              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons
                    name="account"
                    color={'#F4F6F4'}
                    size={32}
                  />
                )}
                label="Profil"
                labelStyle={{
                    ...styles.labelText,
                    color: '#F4F6F4',
                }}
                onPress={() => navigation.navigate('profile')}
              />

              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons
                    name="cog"
                    color={'#F4F6F4'}
                    size={24}
                  />
                )}
                label="Ayarlar"
                labelStyle={{
                    ...styles.labelText,
                    color: '#F4F6F4',
                }}
                onPress={() => navigation.navigate('settings')}
              />
          </View>
      </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    labelText: {
        color: '#F4F6F4',
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        marginStart: -15,
    },
});
