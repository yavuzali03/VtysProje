import {Dimensions, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import {useState} from "react";

export const SearchBar = () => {
    const width = Dimensions.get("window").width;
    const [searchValue, setSearchValue] = useState("");
    return (
        <View style={{width:width*0.7 , height : 40 , backgroundColor:'#1E2739' , borderRadius:15 , justifyContent:'space-evenly',alignItems:'center', flexDirection : "row"}}>
            <TextInput
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder={"Oyuncu ara"}
                placeholderTextColor="lightgray"
                style={{width : width*0.55 , height : 35 ,}} ></TextInput>
            <Icon name={"search"} size={20} color={"lightgray"}></Icon>
        </View>
    )
}
