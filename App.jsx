import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './navigation/navigation';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator/>
        </GestureHandlerRootView>
    );
}

export default App;
