import React, {useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View, Keyboard} from "react-native";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {SubtitleBoldText} from "../components/SubtitleBoldText";
import data from "../lib/Countries";
import {ChooseLanguageButton} from "../components/ChooseLanguageButton";
import ReactNativePickerModule from 'react-native-picker-module'
import {RoundedButton} from "../components/RoundedButton";
import {InputPhoneButton} from "../components/InputPhoneButton";
import {BodyText} from "../components/BodyText";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 25,
  },
  container: {
    flex: 7,
    paddingHorizontal: 25,
    marginTop: '15%',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    paddingRight: 50,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});

export default function LoginScreen() {
  const dispatch = useDispatch();
  let countryInputRef = null;

  const getDefaultCountryIndex = () => data.findIndex(country => country.code === "US")
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(getDefaultCountryIndex);
  const countryDials = data.map(item => `${item.name}  ${item.dial_code}`)

  return (
    <TouchableWithoutFeedback style={{root: 1}} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.root}>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <SubtitleText>Please,</SubtitleText>
          <TitleText style={{width: '50%'}}>Sign In</TitleText>
          <SubtitleBoldText>Country</SubtitleBoldText>
          <ChooseLanguageButton text={countryDials[selectedCountryIndex]} onPress={() => countryInputRef.show()}/>
          <ReactNativePickerModule
            pickerRef={e => (countryInputRef = e)}
            selectedValue={selectedCountryIndex}
            title={"Select your country"}
            items={countryDials}
            onValueChange={(valueText, index) => {
              setSelectedCountryIndex(index);
            }}/>
          <SubtitleBoldText>Phone Number</SubtitleBoldText>
          <BodyText>
            You will receive a verification code to confirm your device.
          </BodyText>
          <InputPhoneButton/>

        </KeyboardAvoidingView>
        <View style={styles.bottom}>
          <RoundedButton onPress={() => dispatch(routeTo(Pages.LOGIN_SCREEN))}/>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
