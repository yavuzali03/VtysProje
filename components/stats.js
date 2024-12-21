import {View, Text, StyleSheet, Dimensions, useWindowDimensions, FlatList, Image} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Dropdown} from 'react-native-element-dropdown';



export const Stats = ({ stats, display }) => {

  const [season, setSeason] = useState("24/25");

  const filteredStats = stats.filter(item => item.seasonID === season);

  const seasons = stats
    .map((item) => item.seasonID) // seasonID değerlerini al
    .filter((value, index, self) => self.indexOf(value) === index) // Benzersiz olanları filtrele
    .map((season) => ({ label: season, value: season })); // İstenilen formata dönüştür

  const SezonlukToplam = () => (
    <View style={styles.routeContainer}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={seasons}
        itemTextStyle={{color: 'black', fontSize: 16,}}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={season}
        onChange={item => {
          setSeason(item.value);
        }}
      />
      <View
        style={{
          width: '100%',
          backgroundColor: '#151b28',
          flexDirection: 'row',
          paddingTop : width*0.03,
          paddingBottom : width*0.03,
          paddingLeft : width*0.01,
          borderRadius: width*0.02,
        }}>
        <Text style={{color: "white", width: '30%', textAlign: 'left'}}>Oynadığı Lig</Text>
        <Icon name="house-chimney" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="shirt" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="futbol" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="handshake" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="yellow" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="red" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="clock" size={16} color="white" style={{width: '10%', textAlign: 'center' }} />
      </View>

      {/* İstatistikler */}
      <FlatList
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={filteredStats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: "100%",
              paddingTop : width*0.01,
              paddingBottom : width*0.01,
              paddingLeft : width*0.01,
            }}>
            <Text style={{textAlign: "left", width: '30%', color: 'white'}}>
              {item.competitionName ? item.competitionName : "-"}
            </Text>
            <View style={{width : "10%" , height : width*0.08 ,justifyContent:"center" , alignItems: "center"}}>
              <Image source={{uri : `https://tmssl.akamaized.net//images/wappen/head/${item.clubID}.png`}} resizeMode={"contain"} width={"80%"} height={"100%"} style={{backgroundColor : "white" , borderRadius : width*0.015}}></Image>
            </View>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.appearances ? item.appearances : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.goals ? item.goals : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.assists ? item.assists : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.yellowCards ? item.yellowCards : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.redCards ? item.redCards : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white',}}>
              {item.minutesPlayed ? item.minutesPlayed : "-"}
            </Text>

          </View>
        )}
      />
      {/*
      <View
        style={{
          width: '100%',
          backgroundColor: '#151b28',
          flexDirection: 'row',
          paddingTop : width*0.03,
          paddingBottom : width*0.03,
          paddingLeft : width*0.01,
          borderRadius: width*0.02,
          marginBottom : width*0.03,
        }}>
        <Text style={{color: "white", width: '30%', textAlign: 'left'}}>Toplam</Text>
        <Icon name="house-chimney" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="shirt" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="futbol" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="handshake" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="yellow" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="red" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="clock" size={16} color="white" style={{width: '10%', textAlign: 'center' }} />
      </View>
      */}

    </View>
  );


  const totalsBySeason = stats.reduce((seasons, { seasonID, clubID, appearances = 0, goals = 0, assists = 0, yellowCards = 0, minutesPlayed = "0'" }) => {
    if (!seasons[seasonID]) {
      seasons[seasonID] = {}; // Yeni sezon için bir nesne oluşturuluyor
    }
    if (!seasons[seasonID][clubID]) {
      seasons[seasonID][clubID] = {
        clubID,
        appearances: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        minutesPlayed: 0,
      };
    }
    seasons[seasonID][clubID].appearances += parseInt(appearances);
    seasons[seasonID][clubID].goals += parseInt(goals);
    seasons[seasonID][clubID].assists += parseInt(assists);
    seasons[seasonID][clubID].yellowCards += parseInt(yellowCards);
    seasons[seasonID][clubID].minutesPlayed += parseInt(minutesPlayed.replace("'", ""));
    return seasons;
  }, {});

  const seasonsData = Object.entries(totalsBySeason).map(([seasonID, clubs]) => ({
    season: seasonID,
    clubs: Object.entries(clubs).map(([clubID, clubStats]) => ({
      clubID,
      stats: clubStats,
    })),
  }));



  const clubsData = seasonsData.flatMap((item) =>
    item.clubs.map((club) => ({
      season: item.season,
      ...club,
    }))
  );

// Appearances değerine göre sırala
  clubsData.sort((a, b) => b.appearances - a.appearances);

  console.log("sezon bilgileri ",stats);
  const SecondRoute = () => (
    <View style={styles.routeContainer}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#151b28',
          flexDirection: 'row',
          marginTop : width*0.03,
          paddingTop : width*0.03,
          paddingBottom : width*0.03,
          paddingLeft : width*0.01,
          borderRadius: width*0.02,
        }}>
        <Text style={{color: "white", width: '15%', textAlign: 'left'}}>Sezon</Text>
        <Text style={{color: "white", width: '10%', textAlign: 'center'}}>Lig</Text>
        <Icon name="house-chimney" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="shirt" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="futbol" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="handshake" size={16} color="white" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="yellow" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="stop" size={16} color="red" style={{width: '10%', textAlign: 'center'}} />
        <Icon name="clock" size={16} color="white" style={{width: '15%', textAlign: 'center' }} />
      </View>

      <FlatList

        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={stats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: "100%",
              paddingTop : width*0.01,
              paddingBottom : width*0.01,
              paddingLeft : width*0.01,
            }}>
            <Text style={{textAlign: "left", width: '15%', color: 'white'}}>
              {item.seasonID ? item.seasonID : "-"}
            </Text>
            <View style={{width : "10%" , height : width*0.08 ,justifyContent:"center" , alignItems: "center"}}>
              <Image source={{uri : `https://tmssl.akamaized.net//images/logo/medium/${item.competitionID.toString().toLowerCase()}.png`}} resizeMode={"contain"} width={"80%"} height={"100%"} style={{backgroundColor : "white" , borderRadius : width*0.015}}></Image>
            </View>
            <View style={{width : "10%" , height : width*0.08 ,justifyContent:"center" , alignItems: "center"}}>
              <Image source={{uri : `https://tmssl.akamaized.net//images/wappen/head/${item.clubID}.png`}} resizeMode={"contain"} width={"80%"} height={"100%"} style={{backgroundColor : "white" , borderRadius : width*0.015}}></Image>
            </View>

            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.appearances ? item.appearances : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.goals ? item.goals : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.assists ? item.assists : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.yellowCards ? item.yellowCards : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '10%', color: 'white'}}>
              {item.redCards ? item.redCards : "-"}
            </Text>
            <Text style={{textAlign: "center", width: '15%', color: 'white',}}>
              {item.minutesPlayed ? item.minutesPlayed : "-"}
            </Text>

          </View>
        )}
      />




    </View>
  );
  const ThirthRoute = () => (
    <View style={styles.routeContainer}>
      <Text style={styles.text}>Second Route</Text>
    </View>
  );

  // SceneMap: Route'ları eşleştirir
  const renderScene = SceneMap({
    first: SezonlukToplam,
    second: SecondRoute,
    third : ThirthRoute,
  });

  const routes = [
    { key: "first", title: "Sezon" },
    { key: "second", title: "Kariyer" },
    { key: "third", title: "boş" },
  ];

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#1E2739', position: "absolute" , height: '100%' }}
      style={{ backgroundColor: '#1ef876' , borderTopLeftRadius : 20 , borderTopRightRadius : 20,}}
      activeColor={"white"}
      inactiveColor={"#1E2739"}
    />
  );
  return (
    <View style={{ width : width*0.9, height : 500 , display : display ? "flex" : "none" , marginBottom :50 ,}}>
      <TabView
        navigationState={{ index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{borderTopLeftRadius : 20 , borderTopRightRadius : 20,}}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  routeContainer: {
    flex : 1,
    paddingRight : width*0.01,
    paddingLeft : width*0.01,
    width : width*0.9,
    height : width*0.9,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1E2739",
    borderBottomLeftRadius : 20 ,
    borderBottomRightRadius : 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  dropdown: {
    margin: 16,
    height: width*0.1,
    width : width*0.3,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor : "white"
  },
  icon: {
    marginRight: 5,
    marginLeft : 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color : "black",
    textAlign : "center"
  },
  selectedTextStyle: {
    fontSize: 16,
    color : "black",
    textAlign : "center",
  },


});
