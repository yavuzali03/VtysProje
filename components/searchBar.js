import {Alert, Dimensions, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Octicons";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const SearchBar = () => {
    const width = Dimensions.get("window").width;

    const [searchValue, setSearchValue] = useState("");
    const navigation = useNavigation();


    const search = ()=> {
      if (searchValue === "") {
        Alert.alert("Uyarı","Lütfen geçerli bir değer giriniz.",[{text : "tamam"}]);
      }else {
        navigation.navigate("searchResults",{searchValue : searchValue})
        setSearchValue("");
      }
  };
    return (
    <View
        style={{
            width: '100%',
            height : width*0.16,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor : "#1B212E"
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name={'three-bars'} size={24} color={'#1ef876'}></Icon>
        </TouchableOpacity>

        <View style={{width:width*0.7 , height : 40 , backgroundColor:'#1E2739' , borderRadius:15 , justifyContent:'space-evenly',alignItems:'center', flexDirection : "row"}}>
            <TextInput
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder={"Oyuncu ara"}
                placeholderTextColor="lightgray"
                returnKeyType={"search"}
                selectionHandleColor={"#1E2739"}
                onSubmitEditing={search}
                style={{width : width*0.55 , height : 35 ,}} ></TextInput>
          <TouchableOpacity onPress={search}>
            <Icon name={"search"} size={20} color={"lightgray"}></Icon>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
            <Icon name={'bell'} size={24} color={'#1ef876'}></Icon>
        </TouchableOpacity>
    </View>
    )
}
