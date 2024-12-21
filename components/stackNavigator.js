import {createStackNavigator} from "@react-navigation/stack";
import {FilterScreen} from "../screens/filterScreen";
import {PlayerScreen} from "../screens/playerScreen";
import {ProfileScreen} from "../screens/profileScreen";
import {SettingsScreen} from "../screens/settingsScreen";
import {FilterResults} from "../screens/filterResults";
import {Details} from "../screens/details";
import {SearchResults} from '../screens/searchResults';


export const StackNavigator = () => {

    const stack = createStackNavigator();

    return (
      <stack.Navigator initialRouteName={"filterScreen"}>


          <stack.Screen
            name={'details'}
            component={Details}
            options={{headerShown: false}}
          />

          <stack.Screen
            name={'filterResults'}
            component={FilterResults}
            options={{headerShown: false}}
          />
          <stack.Screen
            name={'searchResults'}
            component={SearchResults}
            options={{headerShown: false}}
          />

          <stack.Screen
            name={'filterScreen'}
            component={FilterScreen}
            options={{headerShown: false}}
          />

          <stack.Screen
            name={'player'}
            component={PlayerScreen}
            options={{headerShown: false}}
          />

          <stack.Screen
            name={'profile'}
            component={ProfileScreen}
            options={{headerShown: false}}
          />

          <stack.Screen
            name={'settings'}
            component={SettingsScreen}
            options={{headerShown: false}}
          />

      </stack.Navigator>
    );
};
