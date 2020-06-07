import React, {useEffect, useState} from "react";
import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {configureBackgroundLocationIfNecessary} from "Lib/Location";
import Carousel from 'react-native-snap-carousel';
import {t} from 'Lib/i18n';
import {routeTo,} from "Store/actions";
import {Pages} from "Lib/Pages";
import * as Permissions from "expo-permissions";
import {doPermissionCheck} from "Lib/PermissionsHelper";
import {TitleText} from "./TitleText";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {LargeButton} from "./LargeButton";
import {LinearGradient} from "expo-linear-gradient";

const elevationShadowStyle = (elevation) => {
  return {
    elevation,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.55)',
    shadowOffset: {width: 10, height: 10.5 * elevation},
    shadowOpacity: 0.5,
    shadowRadius: 10 * elevation,
    backgroundColor: 'white'
  };
}

const HomeScreen = () => {
  const {accessToken} = useSelector(state => state);
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  // const {notifications} = useSelector(state => state);
  let swiper;
  const alerts = [{displayMessage: "salut"}, {displayMessage: "serif"}, {displayMessage: "bosulica"}]
  const screenWidth = Math.round(Dimensions.get('window').width);

  useEffect(() => {
    configureBackgroundLocationIfNecessary();
  });

  // if (!accessToken) {
  //   dispatch(sessionNotFound());
  //   return <></>;
  // }

  useEffect(() => {
    doPermissionCheck(Permissions.LOCATION, "We need your location to check if you have been exposed!\nPlease go to settings and grant the permission");
    doPermissionCheck(Permissions.NOTIFICATIONS, "We need your permission to alert you in case you have been exposed!\nPlease go to settings and grant the permission");
  }, []);

  useEffect(() => {
    if (swiper.currentIndex !== cardIndex) {
      swiper.snapToItem(cardIndex, true, false)
    }
  }, [cardIndex]);

  const renderCard = ({item}) => {
    return (
      <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.card}>
        <Text style={styles.text}>{item.displayMessage}</Text>
      </LinearGradient>
    )
  };

  const onNextPressed = () => {
    if (cardIndex < alerts.length - 1) {
      setCardIndex(cardIndex + 1)
    }
  }

  const onBackPressed = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1)
    }
  }

  const getForwardVisibility = () => {
    return cardIndex < alerts.length - 1 ? visibleStyle : invisibleStyle;
  }
  const getBackVisibility = () => {
    return cardIndex > 0 ? visibleStyle : invisibleStyle;
  }
  const visibleStyle = {opacity: 100}
  const invisibleStyle = {opacity: 0, height: 0}

  const controls = () => {
    return (
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={onBackPressed}>
          <Image
            style={getBackVisibility()}
            source={require("../../images/buttons/Button_Back.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNextPressed}
        >
          <Image
            style={getForwardVisibility()}
            source={require("../../images/buttons/Button_Next.png")}
          />
        </TouchableOpacity>
      </View>
    )
  };

  const onMenuPress = () => dispatch(routeTo(Pages.MENU_SCREEN))

  const toolbar = () => {
    return (
      <View style={[styles.toolbarContainer, styles.shadow]}>
        <Image style={styles.toolbarLogo}
               source={require("../../images/logo2.png")}
        />
        <TouchableOpacity style={styles.toolbarMenuContainer}
                          onPress={onMenuPress}>
          <Image style={styles.toolbarMenu}
                 source={require("../../images/buttons/Button_Menu_Small.png")}
          />
        </TouchableOpacity>
      </View>
    )
  };

  const alertsTile = () => {
    return (
      <View style={[styles.alertsTile, styles.shadow]}>
        <View style={styles.mainContainer}>
          <Text style={styles.tileInfo}>{alerts.length} unread alerts</Text>
          <TitleText style={styles.alertsTitle}>Exposure{'\n'}Alerts</TitleText>
          <Carousel
            layout={"default"}
            ref={ref => swiper = ref}
            data={alerts}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 80}
            renderItem={renderCard}
            onSnapToItem={index => setCardIndex(index)}/>
          {controls()}
        </View>
        <View style={styles.buttonContainer}>
          <LargeButton text={t("View Alert History")} onPress={onSymptoms}/>
        </View>
      </View>
    )
  };

  const symptomsTile = () => {
    return (
      <View style={[styles.symptomsTile, styles.shadow]}>
        <View style={styles.symptomsContainer}>
          <Text style={styles.tileInfo}>{t("Action recommended")}</Text>
          <TitleText style={styles.symptomsTitle}>Check{'\n'}Symptoms</TitleText>
          <Text
            style={styles.paragraph}>{t("Your region is currently experiencing a high-risk contact event. In order to help assist your community, we recommend updating your status at least once a week.")}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <LargeButton text={t("Perform Checkup")} onPress={onSymptoms}/>
        </View>

      </View>
    )
  };

  const onSymptoms = () => {
    dispatch(routeTo(Pages.SYMPTOM_SURVEY));
  };

  if (alerts.length > 0) {
    return (
      <SafeAreaView style={styles.outer}>
        {toolbar()}
        <ScrollView style={styles.scrollView}>
          {alertsTile()}
          {symptomsTile()}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shadow: elevationShadowStyle(20),
  toolbarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight()
  },
  toolbarLogo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    margin: 12
  },
  toolbarMenuContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16
  },
  toolbarMenu: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  scrollView: {},
  alertsTile: {
    height: 600,
    borderRadius: 10,
    marginBottom: 50,
  },
  symptomsTile: {
    height: 500,
    borderRadius: 10,
    marginBottom: 30,
  },
  mainContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 20,
    flex: 2,
    padding: 12,
    textAlign: 'left',
  },
  alertsTitle: {
    width: '32%',
    lineHeight: 32,
    marginTop: 20,
    marginStart: 12,
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 30
  },
  symptomsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  symptomsTitle: {
    width: '40%',
    lineHeight: 32,
    marginTop: 20,
    marginStart: 12,
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 30
  },
  tileInfo: {
    fontSize: 16,
    backgroundColor: "#dddddd",
    paddingEnd: 12,
    width: '50%',
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  card: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
    shadowOffset: {width: 10, height: 10.5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  controls: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row'
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '75%',
    height: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: 'center'
  },
});

export default HomeScreen;
