import {FlatList, Text, View, StyleSheet, Dimensions} from 'react-native';
import {useEffect, useState} from 'react';
import {PlayerComment} from '../api/playerComment';

export const CommentContainer = ({id , display}) =>{

  const [commentData, setCommentData] = useState(null);
  useEffect(() => {
    PlayerComment(id, setCommentData);
  }, []);

  console.log(id);
  return (
    <View style={{alignItems : "center" ,   marginBottom : width*0.2, display: display ? 'flex' : 'none', flex : 1}}>
      <Text style={{color : "white" , fontWeight : "bold" , fontSize : 28, marginBottom : 10}}>Yorumlar</Text>
      <View
        style={styles.container}>
        { commentData &&  (
          <FlatList
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={commentData.comments}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
            <View
              style={{
                width: width*0.85,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor : "#151b28",
                borderRadius : 12,
                margin : 5,
                padding : 10,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                {item.user_name}
              </Text>
              <Text style={{color: 'lightgray', fontSize: 14, paddingLeft :5 }}>{item.content}</Text>
              <Text style={{color: 'gray', fontSize: 10 , textAlign : "right" , width : "100%"}}>{item.created_at}</Text>
            </View>
          )}></FlatList>)
        }
      </View>
    </View>

  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
container: {
  flex : 1,
  width : width*0.9,
  height : width*0.9,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1E2739",
  borderRadius : 20,
  paddingTop : 5,
  paddingBottom : 5,
},
});
