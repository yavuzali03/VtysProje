import {View , Text} from "react-native";
import {SearchBar} from '../components/searchBar';

export const ProfileScreen = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SearchBar icon={"menu"}/>
            <Text style={{fontSize : 50 , color : "white"}}>ProfileScreen</Text>
        </View>
    )
}
