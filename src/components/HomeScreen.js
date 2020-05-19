import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { configureBackgroundLocationIfNecessary } from "Lib/Location";
import Carousel from 'react-native-snap-carousel';
import {t} from 'Lib/i18n';
import {
  sessionNotFound,
  routeTo,
  markNotificationRead,
} from "Store/actions";
import {Pages} from "Lib/Pages";
import * as Permissions from "expo-permissions";
import {doPermissionCheck} from "Lib/PermissionsHelper";

const HomeScreen = () => {
  const {accessToken} = useSelector(state => state);
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const {notifications} = useSelector(state => state);
  let swiper;

  useEffect(() => {
    configureBackgroundLocationIfNecessary();
  });

  if (!accessToken) {
    dispatch(sessionNotFound());
    return <></>;
  }

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

  if (notifications != null && notifications.length > 0) {
    return (
      <SafeAreaView style={styles.outer}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcome}> {t("Guardian")} </Text>
        </View>
        <View style={styles.textContainer}>
          <Carousel
            layout={"default"}
            ref={ref => swiper = ref}
            data={notifications}
            sliderWidth={400}
            itemWidth={300}
            renderItem={renderCard}
            onSnapToItem={index => setCardIndex(index)}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSymptoms}>
            <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcome}> {t("Guardian")} </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.paragraph}>{t("You currently have no proximity alerts!")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSymptoms}>
          <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#494949',
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    padding: 20
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 50,
    color: '#FFFFFF',
  },
  paragraph: {
    fontSize: 20,
    flex: 1,
    width: 300,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    padding: 20,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#5ccd42',
    bottom: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
});

export default HomeScreen;
