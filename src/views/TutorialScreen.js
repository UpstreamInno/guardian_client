import React, { useState, useEffect } from "react";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import WelcomeScreen from "../views/WelcomeScreen";
import ContactTracingScreen from "../views/ContactTracingScreen";
import YourInformationScreen from "../views/YourInformationScreen";
import Carousel from "react-native-snap-carousel";
import {Dimensions } from "react-native";
import StepIndicator from 'react-native-step-indicator'
import {Pages} from "../lib/Pages";
import {routeTo, setTutorialPage} from "../store/actions";
import {LargeButton} from "../components/LargeButton"

export const TUTORIAL_PAGE_WELCOME = 0
export const TUTORIAL_PAGE_CONTACT_TRACING = 1
export const TUTORIAL_PAGE_YOUR_INFORMATION = 2

const TutorialScreen = () => {
  const dispatch = useDispatch();
  const {currentTutorialPage} = useSelector(state => state);
  let swiper;
  let pages = [0, 1, 2];
  const screenWidth = Math.round(Dimensions.get('window').width);

  useEffect(() => {
    if(swiper.currentIndex !== currentTutorialPage) {
      swiper.snapToItem(currentTutorialPage, true, false)
    }
  }, [currentTutorialPage]);

  const renderCard = ({item}) => {
    switch (item) {
      case 0:
        return <WelcomeScreen/>;
      case 1:
        return <ContactTracingScreen/>;
      case 2:
        return <YourInformationScreen/>;
    }
  };

  const firstIndicatorStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 10,
    separatorStrokeWidth: 0,
    stepStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#A9A9A9',
    stepIndicatorCurrentColor: '#A9A9A9',
    stepStrokeFinishedColor: '#D3D3D3',
    stepStrokeUnFinishedColor: '#D3D3D3',
    stepIndicatorFinishedColor: '#D3D3D3',
    stepIndicatorUnFinishedColor: '#D3D3D3',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
  }

  return (
    <SafeAreaView style={styles.outer}>
      <Carousel
        layout={"default"}
        ref={ref => swiper = ref}
        data={pages}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        renderItem={renderCard}
        onSnapToItem={index => dispatch(setTutorialPage(index))}/>
      <StepIndicator
        stepCount={3}
        customStyles={firstIndicatorStyles}
        currentPosition={currentTutorialPage}
      />
      <View style={styles.bottom}>
        <LargeButton text={"Sign In"} onPress={() => dispatch(routeTo(Pages.NEWSIGNUP_SCREEN))}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  bottom: {
    marginBottom: 40,
    marginTop:20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default TutorialScreen;
