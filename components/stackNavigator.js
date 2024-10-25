import {createStackNavigator} from "@react-navigation/stack";
import {Homescreen} from "../screens/homescreen";
import {PlayerScreen} from "../screens/playerScreen";
import {ProfileScreen} from "../screens/profileScreen";
import {SettingsScreen} from "../screens/settingsScreen";


export const StackNavigator = () => {

    const stack = createStackNavigator();

    return (
        <stack.Navigator initialRouteName={"home"}>

            <stack.Screen
                name={'home'}
                component={Homescreen}
                options={{headerShown: false }}
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
