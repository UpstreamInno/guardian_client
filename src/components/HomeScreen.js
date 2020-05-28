import React, {useEffect, useState} from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {configureBackgroundLocationIfNecessary} from "Lib/Location";
import Carousel from 'react-native-snap-carousel';
import {t} from 'Lib/i18n';
import {routeTo,} from "Store/actions";
import {Pages} from "Lib/Pages";
import * as Permissions from "expo-permissions";
import {doPermissionCheck} from "Lib/PermissionsHelper";
import {TitleText} from "./TitleText";
import {setTutorialPage} from "../store/actions";
import {TUTORIAL_PAGE_YOUR_INFORMATION} from "./TutorialScreen";
import {getStatusBarHeight} from 'react-native-status-bar-height';


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


  const renderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{item.displayMessage}</Text>
      </View>
    )
  };

  const onSymptoms = () => {
    dispatch(routeTo(Pages.SYMPTOM_SURVEY));
  };

  if (alerts.length > 0) {
    return (
      <SafeAreaView style={styles.outer}>
        <View style={styles.toolbarContainer}>
          <Image style={styles.toolbarLogo}
                 source={require("../../images/logo2.png")}
          />
          <Image style={styles.toolbarMenu}
                 source={require("../../images/buttons/Button_Menu_Small.png")}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.alertsTile}>
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
              <TouchableOpacity
                onPress={() => dispatch(setTutorialPage(TUTORIAL_PAGE_YOUR_INFORMATION))}
                style={styles.forwardButton}
              >
                <Image
                  source={require("../../images/buttons/Button_Next.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onSymptoms}>
                <ImageBackground source={require("../../images/buttons/Button_Template_Rounded.png")}
                                 style={styles.backgroundImage}>
                  <Text style={styles.buttonText}>{t("View Alert History")}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.symptomsTile}>
            <View style={styles.mainContainer}>
              <Text style={styles.tileInfo}>{t("Action recommended")}</Text>
              <TitleText style={styles.sympthomsTitle}>Check{'\n'}Sympthoms</TitleText>
              <Text
                style={styles.paragraph}>{t("Your region is currently experiencing a high-risk contact event. In order to help assist your community, we recommend updating your status at least once a week.")}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onSymptoms}>
                <ImageBackground source={require("../../images/buttons/Button_Template_Rounded.png")}
                                 style={styles.backgroundImage}>
                  <Text style={styles.buttonText}>{t("Perform Checkup")}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  // return (
  //   <SafeAreaView style={styles.outer}>
  //     <View style={styles.titleContainer}>
  //       <Text style={styles.welcome}> {t("Guardian")} </Text>
  //     </View>
  //     <View style={styles.textContainer}>
  //       <Text style={styles.paragraph}>{t("You currently have no proximity alerts!")}</Text>
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <TouchableOpacity style={styles.button} onPress={onSymptoms}>
  //         <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
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
  toolbarMenu: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 16
  },
  scrollView: {},
  alertsTile: {
    height: 750
  },
  symptomsTile: {
    height: 500
  },
  mainContainer: {
    flex: 2,
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
  sympthomsTitle: {
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
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    padding: 20
  },
  forwardButton: {
    alignSelf: 'flex-end'
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
