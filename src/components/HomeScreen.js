import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { configureBackgroundLocationIfNecessary } from "Lib/Location";

import {t} from 'Lib/i18n';
import {
  sessionNotFound,
  routeTo,
  markNotificationRead,
} from "Store/actions";
import {Pages} from "Lib/Pages";
import Swiper from "react-native-deck-swiper";
import * as Permissions from "expo-permissions";
import {doPermissionCheck} from "Lib/PermissionsHelper";

const HomeScreen = () => {
  const {accessToken} = useSelector(state => state);
  const dispatch = useDispatch();
  const [swipedAllCards, setSwipedAllCards] = useState(false);
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


  const renderCard = notification => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{notification.displayMessage}</Text>
      </View>
    )
  };

  const onSwiped = () => {
    dispatch(markNotificationRead());
    setCardIndex(cardIndex + 1)
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true)
  };

  const swipeLeft = () => {
    swiper.swipeLeft()
  };

  const onSymptoms = () => {
    dispatch(routeTo(Pages.SYMPTOM_SURVEY));
  };

  if (typeof notifications != "undefined" && notifications != null && notifications.length != null
    && notifications.length > 0 && !swipedAllCards) {
    return (
      <View style={styles.outer}>
        <View style={styles.titleContainer}>
          <Text style={styles.welcome}> {t("Guardian")} </Text>
        </View>
        <View style={styles.textContainer}>
          <Swiper
            ref={swiperVal => {
              swiper = swiperVal
            }}
            onSwiped={() => onSwiped()}
            onSwipedLeft={() => onSwiped()}
            onSwipedRight={() => onSwiped()}
            onSwipedTop={() => onSwiped()}
            onSwipedBottom={() => onSwiped()}
            onTapCard={swipeLeft}
            cardIndex={cardIndex}
            cards={notifications}
            renderCard={renderCard}
            onSwipedAll={onSwipedAllCards}
            backgroundColor={'#494949'}
            stackSize={3}
            stackSeparation={15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          >
          </Swiper>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSymptoms}>
            <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (<View style={styles.outer}>
    <View style={styles.titleContainer}>
      <Text style={styles.welcome}> {t("Guardian")} </Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.paragraph}>{t("No contacts ")}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onSymptoms}>
        <Text style={styles.buttonText}>{t("Report Symptoms")}</Text>
      </TouchableOpacity>
    </View>
  </View>);
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
    flexGrow: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    height: "70%",
    width: "100%",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
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
    flex: 0.8,
    width: "90%",
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
