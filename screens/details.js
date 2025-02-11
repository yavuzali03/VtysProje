import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from '../components/searchBar';
import {Stats} from '../components/stats';
import LoadingScreen from './loadingScreen';
import {PositionValue} from '../data/positionValue';
import {PlayerData} from '../api/playerData';
import {FootValue} from '../data/footValue';
import {CommentContainer} from '../components/commentContainer';


export const Details = ({route}) => {
  const {id} = route.params;
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetailsPressed, setIsDetailsPressed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [isCommentsPressed, setIsCommentsPressed] = useState(false);


  const positions = new PositionValue().positions;
  const foots = new FootValue().foots;

  const scrollViewRef = useRef(null);

  const autoScroll = ()=> {
    if (isDetailsPressed === true && isCommentsPressed === false)
    {
      scrollViewRef.current.scrollTo({
      y: 900,
      animated: true,
    });
    }else {
      scrollViewRef.current.scrollTo({
        y: 350,
        animated: true,
      });
    }
  };

  const commentButton = ()=>{
    autoScroll();
    setIsCommentsPressed(!isCommentsPressed);
  }

  const statsButton = ()=>{
    autoScroll();
    setIsDetailsPressed(!isDetailsPressed);

  }

  useEffect(() => {
    PlayerData(id , setPlayerData , setLoading);
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  const fetchAnalysis = async () => {
    setAnalysisLoading(true);
    try {
      const response = await fetch(
        `http://44.195.206.105/player/analyze-player/${id}`,
      );
      const json = await response.json();
      setAnalysisData(json); // Store analysis data
    } catch (error) {
      console.error(error);
    }finally {
      setAnalysisLoading(false);
    }
  };

  const position = positions.find(item => item.value === playerData.profile.position.main)?.label || 'Bilinmiyor';
  const foot = foots.find(item => item.value === playerData.profile.foot)?.label || 'Bilinmiyor';

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#1B212E'}} ref={scrollViewRef}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#1B212E',
        }}>
        <SearchBar icon={"chevron-left"}></SearchBar>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#1ef876', '#15ae53', '#0c632f']}
          style={styles.linearGradient}>
          <Image
            source={{uri: playerData.profile.imageURL}}
            style={{
              height: width * 0.24,
              width: width * 0.18,
              backgroundColor: 'gray',
              borderRadius: 16,
            }}></Image>
          <View
            style={{
              flex: 1,
              marginStart: 15,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.playerName}>{playerData.profile.name}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              width: width * 0.2,
              height: width * 0.2,
              backgroundColor: '#15ae53',
              right: -10,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
            }}>
            <Text style={styles.shirtNumber}>
              {playerData.profile.shirtNumber}
            </Text>
          </View>
        </LinearGradient>

        <View style={[styles.borderView, {height: width * 0.3}]}>
          <View style={[styles.insideView, {height: width * 0.285}]}>
            <Text style={{fontSize: 50, color: 'white', fontWeight: 'bold'}}>
              {playerData.market_value.marketValue}
            </Text>
          </View>
        </View>

        <View style={styles.borderView}>
          <View style={[styles.insideView, {flexDirection: 'column'}]}>
            <View
              style={[
                styles.infoView,
                {flexDirection: 'column', alignItems: 'center'},
              ]}>
              <Image
                source={require('../assets/VTYSicons/birthday-cake.png')}
                style={{width: width * 0.1, height: width * 0.1}}></Image>
              <Text style={styles.text}>{playerData.profile.dateOfBirth}</Text>
            </View>

            <View style={styles.infoView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/house.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>
                  {playerData?.profile?.placeOfBirth?.city || '-'}
                </Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/united-nations.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>
                  {playerData.profile.citizenship[0]}
                </Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/height.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>{playerData.profile.height}</Text>
              </View>
            </View>

            <View style={styles.infoView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/shoe.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>{foot}</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/football-court.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>{position}</Text>
              </View>
            </View>

            <View style={styles.infoView}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/football-club.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>{playerData.profile.club.name}</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/VTYSicons/collaboration.png')}
                  style={{width: width * 0.1, height: width * 0.1}}></Image>
                <Text style={styles.text}>
                  {playerData.profile.club.contractExpires}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.6,
            marginBottom: 10,
            backgroundColor: '#15ae53',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={fetchAnalysis}>
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.05,
              paddingRight: 5,
            }}>
            {analysisLoading ? "Oyuncu analiz ediliyor" : "Oyuncuyu analiz et"}
          </Text>
          {//
            analysisLoading ? (<ActivityIndicator size={24} color="white" />) : (<Icon name="chart-line" color="white" size={20} />)
          }

        </TouchableOpacity>

        {analysisData && (
          <View
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: '#1E2739',
              borderRadius: 10,
              width: width * 0.9,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Analiz Sonuçları:
            </Text>
            {analysisData.data
              ?.split('\n\n') // Split text into sections
              .map((section, index) => {
                const boldMatch = section.match(/\*\*(.*?)\*\*/); // Match bold text pattern
                if (boldMatch) {
                  const boldText = boldMatch[1]; // Extract the bolded text
                  const remainingText = section
                    .replace(/\*\*(.*?)\*\*/, '')
                    .trim(); // Remove the bold text
                  return (
                    <View key={index} style={{marginBottom: 10}}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {boldText}
                      </Text>
                      <Text
                        style={{color: 'white', marginTop: 5, lineHeight: 22}}>
                        {remainingText}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <Text
                      key={index}
                      style={{
                        color: 'white',
                        marginTop: 5, // Small top margin for separation
                        marginBottom: 10, // Ensure spacing between paragraphs
                        lineHeight: 22,
                      }}>
                      {section.trim()}
                    </Text>
                  );
                }
              })}
          </View>
        )}
        <View style={{flexDirection : "row" , justifyContent: "space-evenly" , alignItems: 'center' , width : "100%"}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={statsButton}>
          <Text
            style={{color: 'white', fontSize: width * 0.04, paddingRight: 5}}>
            {isDetailsPressed
              ? 'İstatistikleri gizle'
              : 'İstatistikleri göster'}
          </Text>
          <Icon
            name={isDetailsPressed ? 'angle-up' : 'angle-down'}
            color={'white'}
            size={20}></Icon>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={commentButton}>
          <Text
            style={{color: 'white', fontSize: width * 0.04, paddingRight: 5}}>
            {isCommentsPressed
              ? 'Yorumları gizle'
              : 'Yorumları göster'}
          </Text>
          <Icon
            name={isCommentsPressed ? 'angle-up' : 'angle-down'}
            color={'white'}
            size={20}></Icon>
        </TouchableOpacity>
        </View>
        <Stats
          display={isDetailsPressed}
          stats={playerData.stats.stats}
          marketHistory={playerData.market_value.marketValueHistory}></Stats>

        <CommentContainer id={id} display={isCommentsPressed} ></CommentContainer>

      </View>
    </ScrollView>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  linearGradient: {
    width: width * 0.9,
    height: width * 0.3,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  playerName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.07,
    maxWidth: width * 0.4,
  },
  shirtNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.08,
    maxWidth: width * 0.4,
  },
  borderView: {
    backgroundColor: '#1ef876',
    width: width * 0.9,
    height: width,
    borderRadius: 20,
    alignItems: 'center',
    margin: height * 0.02,
  },
  insideView: {
    backgroundColor: '#1E2739',
    width: width * 0.885,
    height: width * 0.985,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 20,
  },
  infoView: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: width * 0.245,
    flexDirection: 'row',
  },
});
