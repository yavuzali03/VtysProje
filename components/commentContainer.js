import {Dimensions, FlatList, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

export const CommentContainer = ({id , display}) =>{

    const [commentData, setCommentData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://44.195.206.105/player/${id}/comments`);
        const json = await response.json();
        setCommentData(json);
      } catch (error) {
        console.error('Error fetching player data:', error);
      } ;
    };
    fetchData();
  }, []);


  return (
    <View style={{width : "90%" , height : 300 , display : display ? "flex" : "none" , backgroundColor: '#1E2739' , marginBottom : 20 , paddingTop : 20, paddingLeft : 15 }} >
        <FlatList
          data={commentData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={{ width : "90%", height : 50 , justifyContent : "center", alignItems: "flex-start",  paddingLeft : 5 , borderColor : "#1ef876" , borderBottomWidth : 2 , }}>
              <Text style={{color : "white" , fontSize : 16 , fontWeight : "bold"}}>{item.user_name}</Text>
              <Text style={{color : "white" , fontSize : 14 }}>{item.content}</Text>
            </View>
          )}>

        </FlatList>
    </View>
  );
};
