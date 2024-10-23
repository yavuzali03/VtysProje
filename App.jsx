import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {DrawerNavigation} from './components/drawerNavigation';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <DrawerNavigation></DrawerNavigation>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;
