import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ImageBackground, StyleSheet, Text, View, FlatList, ScrollView, RefreshControl, Image, Dimensions, ActivityIndicator, TouchableWithoutFeedback, StatusBar, SafeAreaView, Platform, MainScreen, TouchableOpacity, Linking } from "react-native";
import { BlurView } from 'expo-blur';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDollarSign, faMapMarked, faBus, faInfo, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';

class MainMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.refs._scrollView.scrollTo({x: (Dimensions.get('screen').width)*2, y: 0, animated: false}), 0);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          ref='_scrollView'
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          //onLoad={() => { this.refs._scrollView.scrollTo({x: (Dimensions.get('screen').width)*2, y: 0, animated: true}); }}
        >
          {this.props.children}
        </ScrollView>
        <View style={[styles.bg_light, styles.menu]}>
          <TouchableOpacity style={[styles.d_inline, styles.menuElem]} onPress={() => { this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true}); }}>
            <FontAwesomeIcon style={[styles.text_shadow]} icon={ faMapMarked } color={ "#222" }/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.d_inline, styles.menuElem]} onPress={() => { this.refs._scrollView.scrollTo({x: Dimensions.get('screen').width, y: 0, animated: true}); }}>
            <FontAwesomeIcon style={[styles.text_shadow]} icon={ faBus } color={ "#222" }/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.d_inline, styles.menuElem]} onPress={() => { this.refs._scrollView.scrollTo({x: (Dimensions.get('screen').width)*2, y: 0, animated: true}); }}>
            <FontAwesomeIcon style={[styles.text_shadow]} icon={ faUmbrella } color={ "#222" }/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.d_inline, styles.menuElem]} onPress={() => { this.refs._scrollView.scrollTo({x: (Dimensions.get('screen').width)*3, y: 0, animated: true}); }}>
            <FontAwesomeIcon style={[styles.text_shadow]} icon={ faDollarSign } color={ "#222" }/>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.d_inline, styles.menuElem]} onPress={() => { this.refs._scrollView.scrollTo({x: (Dimensions.get('screen').width)*4, y: 0, animated: true}); }}>
            <FontAwesomeIcon style={[styles.text_shadow]} icon={ faInfo } color={ "#222" }/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const fetchFonts = () => {
  return Font.loadAsync({
    Montserrat_Regular: require('./assets/fonts/MontserratAlternates-Regular.ttf'),
    Montserrat_SemiBold: require('./assets/fonts/MontserratAlternates-SemiBold.ttf'),
    Montserrat_Light: require('./assets/fonts/MontserratAlternates-Light.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isWLoading, setWLoading] = useState(true);
  const [wdata, setWData] = useState([]);

  const [isCLoading, setCLoading] = useState(true);
  const [cdata, setCData] = useState([]);

  const [isBLoading, setBLoading] = useState(true);
  const [bdata, setBData] = useState([]);

  useEffect(() => {
    fetch('http://spacedesign.in.ua/my_kovel/weather.php')
      .then((response) => response.json())
      .then((json) => setWData(json))
      .catch((error) => console.error(error))
      .finally(() => setWLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://spacedesign.in.ua/my_kovel/currency.php')
      .then((response) => response.json())
      .then((json) => setCData(json))
      .catch((error) => console.error(error))
      .finally(() => setCLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://spacedesign.in.ua/my_kovel/buses.php')
        .then((response) => response.json())
        .then((json) => setBData(json))
        .catch((error) => console.error(error))
        .finally(() => setBLoading(false));
  }, []);

  if(!fontLoaded){
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      />
      );
  }

  const img = {
    //sunrise
    sr_c0: require("./images/sr_c0.png"),
    sr_c11_25: require("./images/sr_c11-25.png"),
    sr_c25_50: require("./images/sr_c25-50.png"),
    sr_c51_84: require("./images/sr_c51-84.png"),
    sr_c85_100: require("./images/sr_c85-100.png"),
    //day
    d_c0: require("./images/d_c0.png"),
    d_c11_25: require("./images/d_c11-25.png"),
    d_c25_50: require("./images/d_c25-50.png"),
    d_c51_84: require("./images/d_c51-84.png"),
    d_c85_100: require("./images/d_c85-100.png"),
    //sunset
    ss_c0: require("./images/ss_c0.png"),
    ss_c11_25: require("./images/ss_c11-25.png"),
    ss_c25_50: require("./images/ss_c25-50.png"),
    ss_c51_84: require("./images/ss_c51-84.png"),
    ss_c85_100: require("./images/ss_c85-100.png"),
    //night
    n_c0: require("./images/n_c0.png"),
    n_c11_25: require("./images/n_c11-25.png"),
    n_c25_50: require("./images/n_c25-50.png"),
    n_c51_84: require("./images/n_c51-84.png"),
    n_c85_100: require("./images/n_c85-100.png"),
  };

  // const icon = {
  //   //day
  //   '01d': require("./images/icons/01d.png"),
  //   '02d': require("./images/icons/02d.png"),
  //   '03d': require("./images/icons/03d.png"),
  //   '04d': require("./images/icons/04d.png"),
  //   '09d': require("./images/icons/09d.png"),
  //   '10d': require("./images/icons/10d.png"),
  //   '11d': require("./images/icons/11d.png"),
  //   '13d': require("./images/icons/13d.png"),
  //   '50d': require("./images/icons/50d.png"),
  //   //night
  //   '01n': require("./images/icons/01n.png"),
  //   '02n': require("./images/icons/02n.png"),
  //   '03n': require("./images/icons/03n.png"),
  //   '04n': require("./images/icons/04n.png"),
  //   '09n': require("./images/icons/09n.png"),
  //   '10n': require("./images/icons/10n.png"),
  //   '11n': require("./images/icons/11n.png"),
  //   '13n': require("./images/icons/13n.png"),
  //   '50n': require("./images/icons/50n.png"),
  // };

  return(
    
    <View style={styles.container}>
      {isWLoading ? <ActivityIndicator/> : (
      <ImageBackground source={eval('img.'+wdata.now.image)} style={styles.background_image}>
        {wdata.now.description == 'Дощ' ? <ImageBackground source={require("./images/rain.gif")} style={styles.preps}></ImageBackground> : true}
        <MainMenu>
          <StatusBar backgroundColor='#fff' barStyle="dark-content" />
          <View style={[styles.scrollElem, styles.bg_white, styles.pt_5]}>
            <Text style={[styles.h1, styles.text_line_through, styles.text_dark, styles.text_shadow]}>Карта</Text>
          </View>
          <View style={[styles.scrollElem, styles.pt_5]}>
            <Text style={[styles.h1, styles.text_line_through, styles.text_light, styles.text_shadow]}>Розклад</Text>
            <DropDownPicker
                items={[
                  {label: 'UK', value: 'uk'},
                  {label: 'France', value: 'france'},
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                // onChangeItem={}
            />
          </View>
          <View style={[styles.scrollElem, styles.text_center, styles.pt_10]}>
              <View>
                <Text style={[styles.h1, styles.text_shadow]}>{wdata.now.temp}°</Text>
                <Text style={[styles.paragraph, styles.text_shadow, styles.text_center]}>{wdata.now.description}</Text>
              </View>
              <View style={[styles.infoblock]}>
                <GestureHandlerScrollView horizontal style={styles.bg_white}>
                  <FlatList
                    data={wdata.forecast}
                    renderItem={({ item }) => (
                    <View style={styles.forecastblock}>
                      <Text style={styles.forecasttext}>{item.time}</Text>
                      {/* <Image style={styles.weathericon} source={icon[item.icon]} />  */}
                      <Text style={styles.forecasttemp}>{item.temp}°</Text>
                    </View>)}
                    keyExtractor={item => item.id}
                    horizontal={true}
                  />
                </GestureHandlerScrollView>
              </View>
          </View>
          <View style={[styles.scrollElem, styles.text_center, styles.p_4]}>
              <Text style={[styles.h1, styles.text_light, styles.text_shadow]}>Курси</Text>
              <View style={[styles.rounded, styles.bg_light, styles.text_center, styles.p_2, {marginTop: 20}]}>
                <View style={styles.c_row}>
                  <Text style={styles.c_header}>Купівля</Text>
                  <Text style={styles.c_header}>Продаж</Text>
                </View>
                <View style={styles.c_row}>
                  <Text style={styles.c_text}>{cdata.uB}</Text>
                  <Text style={styles.c_text}>USD</Text>
                  <Text style={styles.c_text}>{cdata.uA}</Text>
                </View>
                <View style={styles.c_row}>
                  <Text style={styles.c_text}>{cdata.eB}</Text>
                  <Text style={styles.c_text}>EUR</Text>
                  <Text style={styles.c_text}>{cdata.eA}</Text>
                </View>
                <View style={styles.c_row}>
                  <Text style={styles.c_text}>{cdata.rB}</Text>
                  <Text style={styles.c_text}>RUB</Text>
                  <Text style={styles.c_text}>{cdata.rA}</Text>
                </View>
                <View style={styles.c_row}>
                  <Text style={styles.c_text}>{cdata.pB}</Text>
                  <Text style={styles.c_text}>PLN</Text>
                  <Text style={styles.c_text}>{cdata.pA}</Text>
                </View>
                <View style={styles.c_row}>
                  <Text style={styles.c_text}>{cdata.fB}</Text>
                  <Text style={styles.c_text}>BYN</Text>
                  <Text style={styles.c_text}>{cdata.fA}</Text>
                </View>
              </View>
          </View>
          <View style={[styles.scrollElem, styles.bg_white, styles.pt_5]}>
            <Text style={[styles.h3, styles.text_dark, styles.text_shadow]}>Про додаток</Text>
            <Text style={[styles.paragraph, styles.text_dark, styles.mt_4, styles.text_center]}>Дані взято з:</Text>
            <View style={[styles.m_2, {flexDirection: 'row'} ]}>
              <Text style={[styles.paragraph, styles.text_dark, styles.text_left]}>Погода:  </Text>
              <Text style={[styles.paragraph, styles.link]} onPress={() => Linking.openURL('https://openweathermap.org/')}>OpenWeatherMap</Text>
            </View>
            <View style={[styles.m_2, {flexDirection: 'row'} ]}>
              <Text style={[styles.paragraph, styles.text_dark, styles.text_left]}>Розклад:  </Text>
              <Text style={[styles.paragraph, styles.link]} onPress={() => Linking.openURL('https://kovel-transport.com.ua/')}>kovel-transport.com.ua</Text>
            </View>
            <View style={[styles.m_2, {flexDirection: 'row'} ]}>
              <Text style={[styles.paragraph, styles.text_dark, styles.text_left]}>Курси валют:  </Text>
              <Text style={[styles.paragraph, styles.link]} onPress={() => Linking.openURL('https://kurs.volyn.ua/')}>kurs.volyn.ua</Text>
            </View>
          </View>
        </MainMenu>
        </ImageBackground>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  link:{
    color: 'blue'
  },
  d_inline:{
    marginLeft:'auto',
    marginRight:'auto',
  },
  menu:{
    flexDirection: 'row',
  },
  menuElem:{
    padding: 20,
  },
  scrollElem:{
    width: Dimensions.get('screen').width,
  },
  text_shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#222",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 10,
      },
      android: {
        textShadowColor: 'rgba(34, 34, 34, 0.5)', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 5,
      },
    }),
  },
  bg_light: {
    backgroundColor:'white'
  },
  text_light:{
    color: "#fff"
  },
  text_dark:{
    color: "#222"
  },
  text_center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  text_left: {
    textAlign: 'left',
  },
  text_right: {
    textAlign: 'right',
  },
  rounded: {
    borderRadius: 30
  },
  infoview: {
    flex: 1
  },
  container: {
    
    flex: 1,
  },
  background_image: {
    flex: 1,
    resizeMode: "cover",
  },
  preps: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.1,
  },
  paragraph: {
    fontFamily: "Montserrat_Regular",
    color: "#fff",
    fontSize: 15,
  },
  h1: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 60,
  },
  h2: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 50,
  },
  h3: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 40,
  },
  h4: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 30,
  },
  h5: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 20,
  },
  h6: {
    textAlign: 'center',
    fontFamily: "Montserrat_SemiBold",
    color: "#fff",
    fontSize: 15,
  },
  forecasttext: {
    fontFamily: "Montserrat_Regular",
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
  },
  forecasttemp: {
    fontFamily: "Montserrat_Regular",
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18,
  },
  bg_white: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  infoblock: {
    position: 'absolute',
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    height: 'auto',
    width: "100%",
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  forecastblock: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    textAlign: 'center', 
    padding: 15,
    margin: 10,
    marginRight:5,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  weathericon: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  c_row: {
    flexDirection: 'row',
  },
  c_header: {
    fontFamily: "Montserrat_SemiBold",
    color: "#666",
    fontSize: 15,
    padding: 15,
  },
  c_text: {
    fontFamily: "Montserrat_Regular",
    color: "#666",
    fontSize: 15,
    padding: 15,
  },


  //font
  text_line_through:{
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },

  //margins and paddings
  my_1: {
    marginBottom: 10,
    marginTop: 10
  },
  my_2: {
    marginBottom: 20,
    marginTop: 20
  },
  my_3: {
    marginBottom: 30,
    marginTop: 30
  },
  my_4: {
    marginBottom: 40,
    marginTop: 40
  },
  my_5: {
    marginBottom: 50,
    marginTop: 50
  },

  mt_1: {
    marginTop: 10
  },
  mt_2: {
    marginTop: 20
  },
  mt_3: {
    marginTop: 30
  },
  mt_4: {
    marginTop: 40
  },
  mt_5: {
    marginTop: 50
  },

  m_1: {
    margin: 10
  },
  m_2: {
    margin: 20
  },
  m_3: {
    margin: 30
  },
  m_4: {
    margin: 40
  },
  m_5: {
    margin: 50
  },

  //paddings
  p_1:{
    padding:10,
  },
  p_2:{
    padding:20,
  },
  p_3:{
    padding:30,
  },
  p_4:{
    padding:40,
  },
  p_5:{
    padding:50,
  },

  pt_1:{
    paddingTop:10,
  },
  pt_2:{
    paddingTop:20,
  },
  pt_3:{
    paddingTop:30,
  },
  pt_4:{
    paddingTop:40,
  },
  pt_5:{
    paddingTop:50,
  },
  pt_10:{
    paddingTop:100,
  }
});