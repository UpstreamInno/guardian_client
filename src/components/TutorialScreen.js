import React, { useState } from "react";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import WelcomeScreen from "../views/WelcomeScreen";
import ContactTracingScreen from "../views/ContactTracingScreen";
import YourInformationScreen from "../views/YourInformationScreen";
import Carousel from "react-native-snap-carousel";
import {Dimensions } from "react-native";
import StepIndicator from 'react-native-step-indicator'
import {Pages} from "../lib/Pages";

const TutorialScreen = () => {
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  let swiper;
  let pages = [0, 1, 2];
  const screenWidth = Math.round(Dimensions.get('window').width);

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
    stepStrokeCurrentColor: '#A9A9A9',
    stepStrokeFinishedColor: '#A9A9A9',
    stepStrokeUnFinishedColor: '#A9A9A9',
    currentStepStrokeWidth: 2,
    stepIndicatorFinishedColor: '#D3D3D3',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#A9A9A9',
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
        onSnapToItem={index => setCardIndex(index)}/>
      <StepIndicator
        stepCount={3}
        customStyles={firstIndicatorStyles}
        currentPosition={cardIndex}
      />
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => dispatch(routeTo(Pages.LOGIN_SCREEN))}>
          <Image
            source={require("../../images/buttons/Button_Login.png")}
          />
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default TutorialScreen;
