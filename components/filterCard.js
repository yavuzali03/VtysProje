import {View, StyleSheet, Dimensions, TouchableOpacity, Image, Text} from "react-native";

export const FilterCard = ({isStatus , setIsStatus ,Label , ImageName , children}) => {

 return(
     <TouchableOpacity onPress={()=>{setIsStatus(!isStatus)}}>{
        isStatus ? (<View style={styles.borderView}>
                <View style={styles.insideView}>
                    <Image
                        style={{ opacity: 0.1, width: width * 0.55, height: width * 0.5 }}
                        source={ImageName}
                        resizeMode={"stretch"}
                    />
                    {children}
                </View>
            </View>) :

            (<View style={styles.borderView}>
            <View style={styles.insideView}>
                <Image
                    source={ImageName}
                    height={100}
                    width={100}></Image>
                <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                    {Label}
                </Text>
            </View>
        </View>)
     }
     </TouchableOpacity>
 );
};


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    borderView: {
        backgroundColor: '#00FF00',
        width: width * 0.6,
        height: width * 0.5,
        borderRadius: 20,
        alignItems: 'center',
        margin : height*0.02,
    },
    insideView: {
        backgroundColor: '#1E2739',
        width: width * 0.58,
        height: width * 0.48,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
