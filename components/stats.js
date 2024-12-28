import {View, Text, StyleSheet, Dimensions, useWindowDimensions, FlatList, Image} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Dropdown} from 'react-native-element-dropdown';
import { LineChart } from "react-native-gifted-charts";


export const Stats = ({ stats, display, marketHistory }) => {

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

    </View>
  );

  const KariyerIstatistikleri = () => (
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

  const MarketDeğeri = () => {

    function convertToNumber(value) {
      // Eğer 'm' varsa, değeri milyon cinsinden çeviririz
      if (value.includes('m')) {
        return parseFloat(value.replace('€', '').replace('m', '').trim()) * 1000000;
      }
      // Eğer 'k' varsa, değeri bin cinsinden çeviririz
      if (value.includes('k')) {
        return parseFloat(value.replace('€', '').replace('k', '').trim()) * 1000;
      }
      // Eğer başka bir format varsa, değeri olduğu gibi alırız
      return parseFloat(value.replace('€', '').trim());
    }

    const dataPoint = ()=>{
      return (
        <View style={{
          backgroundColor : "#1ef876",
          width : 8 ,
          height : 8 ,
          borderRadius : 5,
          marginBottom : 3,
          }}>
        </View>
      );
    };

    const customLabel = (item) => {
      return (
        <View style={{width: 100, marginLeft: 10}}>
          <Text style={{color: 'white', fontWeight: 'normal' , fontSize : 10}}>{item}</Text>
        </View>
      );
    };

    const data = marketHistory.map((item) => ({
      value: convertToNumber(item.value),
      date : item.date,
      clubId : item.clubID,
      labelValue : item.value,
      hideDataPoint : false,
      customDataPoint : dataPoint,
      labelComponent: () => customLabel(item.date),

    }));

    const maxValue = Math.max(...data.map(item => item.value));
    const chartMaxValue = maxValue * 1.2;
    const [pointData , setPointData] = useState([]);

    console.log(pointData);
    return(
      <View
        style={styles.routeContainer }>

        <View style={{ marginTop : 15, marginBottom : 15,flexDirection : "row",backgroundColor : "white" , width : width*0.4 , height : width*0.2 , borderRadius : width*0.05 , justifyContent : "center" , alignItems: "center"}}>
          <Image source={{uri : `https://tmssl.akamaized.net//images/wappen/head/${pointData.clubId}.png`}} resizeMode={"contain"}  style={{width : 50 , height : 50}}></Image>

          <View>
            <Text style={{color: 'black', fontSize: 14,textAlign:'center'}}>{pointData.date}</Text>

            <Text style={{fontWeight: 'bold',textAlign:'center', color : "black", fontSize : 18}}>{pointData.labelValue}</Text>
          </View>

        </View>

        <LineChart
          areaChart
          curved
          data={data}
          rotateLabel
          width={width*0.7}
          spacing={30}
          color="#00ff83"
          thickness={2}
          startFillColor="rgba(20,105,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={10}
          noOfSections={6}
          maxValue={chartMaxValue}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType="solid"
          rulesColor="gray"
          yAxisTextStyle={{color: 'gray'}}
          yAxisSide='right'
          xAxisColor="lightgray"
          formatYLabel={(value) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}K`;
            } else {
              return value.toString();
            }
          }}
          pointerConfig={{
            showPointerStrip: false,
            pointerColor: '#ffffff',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              const currentItem = items[0];
              if (pointData?.labelValue !== currentItem.labelValue) {
                setPointData(currentItem);
              }
            },
          }}
        />
        </View>
          );

  };

  // SceneMap: Route'ları eşleştirir
  const renderScene = SceneMap({
    first: SezonlukToplam,
    second: KariyerIstatistikleri,
    thirt : MarketDeğeri,
  });

  const routes = [
    { key: "first", title: "Sezon" },
    { key: "second", title: "Kariyer" },
    { key: "thirt", title: "Piyasa Değeri" },
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
