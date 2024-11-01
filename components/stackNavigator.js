import {createStackNavigator} from "@react-navigation/stack";
import {Homescreen} from "../screens/homescreen";
import {PlayerScreen} from "../screens/playerScreen";
import {ProfileScreen} from "../screens/profileScreen";
import {SettingsScreen} from "../screens/settingsScreen";
import {SearchingResults} from "../screens/searchingResults";
import {Details} from "../screens/details";


export const StackNavigator = () => {

    const stack = createStackNavigator();

    return (
        <stack.Navigator initialRouteName={"details"}>

            <stack.Screen
                name={'details'}
                component={Details}
                options={{headerShown: false}}
            />

            <stack.Screen
                name={'searchingResults'}
                component={SearchingResults}
                options={{headerShown: false}}
            />

            <stack.Screen
                name={'home'}
                component={Homescreen}
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
