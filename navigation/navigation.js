import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/homeScreen';
import {Details} from '../screens/details';
import {FilterResults} from '../screens/filterResults';
import {SearchResults} from '../screens/searchResults';
import {FilterScreen} from '../screens/filterScreen';
import {PlayerScreen} from '../screens/playerScreen';
import {ProfileScreen} from '../screens/profileScreen';
import {SettingsScreen} from '../screens/settingsScreen';
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, View ,StyleSheet} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>

    <Stack.Screen
      name={'home'}
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={'details'}
      component={Details}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name={'filterResults'}
      component={FilterResults}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={'searchResults'}
      component={SearchResults}
      options={{headerShown: false}}
    />


    <Stack.Screen
      name={'filterScreen'}
      component={FilterScreen}
      options={{headerShown: false}}
    />


  </Stack.Navigator>
  );
}

function CustomDrawerContent(props){
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

      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType : 'front',
        drawerStyle : {backgroundColor : "#1E2739"},
        
      }}
      drawerContent = {(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="mainScreen" component={()=> <StackNavigator/>} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
function AppNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  labelText: {
    color: '#F4F6F4',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginStart: -15,
  },
});

export default AppNavigator;
