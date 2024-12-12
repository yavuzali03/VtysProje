import React from 'react';
import {View, ActivityIndicator,StyleSheet, Image, Dimensions} from 'react-native';

const LoadingScreen = () => {

  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={width*0.5} color="#1ef876" />

      <Image
        source={require('../assets/logo.png')}
        style={{height: width*0.2, width: width*0.2 , position : "absolute" , resizeMode : "contain"}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#000E14"
  },
});

export default LoadingScreen;
