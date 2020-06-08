import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, 
    View, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import { userSignUp } from "Store/actions";
import {SubtitleText} from "../components/SubtitleText";
import {SubtitleBoldText} from "../components/SubtitleBoldText";
import {BodyText} from "../components/BodyText";
import {LargeButtonRectangle} from "../components/LargeButtonRectangle";
import {LargeButtonRectangleWithIcons} from "../components/LargeButtonRectangleWithIcons";
import {RoundedButton} from "../components/RoundedButton";
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 85,
    },
    scrollViewContainer: {
      backgroundColor: '#F0F0F0'
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    container: {
        flex: 4,
        paddingHorizontal: 25,
    },
    center: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    bottom: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 20,
        marginRight: 20,
        backgroundColor: '#F0F0F0'
    }
});

export default function NewSignupScreen() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState(null);

    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [number, setPhoneNumber] = useState("");
    const [focusKeyboard, setFocusKeyboard] = useState(false);
    const [hidePhoneIcon, sethidePhoneIcon] = useState(false);
    const [hideCountryIcon, setHideCountryIcon] =  useState(false);
    const [hideDropdownIcon, setHideDropdownIcon] = useState(false);
    const [validPhone, setValidPhone] = useState(false);

    const onSignUp = () => dispatch(userSignUp(countryCode + number));


    function changePhoneNumber(value){
        console.log("changePhoneNumber", value);
                console.log("changePhoneNumber length", value.length);
        if(value.length >= 1 ){
            sethidePhoneIcon(true);
        } else {
          sethidePhoneIcon(false);
        }
        setPhoneNumber(value);
        setFocusKeyboard(false);
        const stringPhone = countryCode + value;
        console.log("stringPhone", stringPhone);
        const phoneNumber = parsePhoneNumberFromString(countryCode + value);
        console.log("phoneNumber");
        if(phoneNumber != null && phoneNumber.isValid() == false){
            alert("Invalid Phone Number");
            setValidPhone(false);
        } else if(phoneNumber!= null && phoneNumber.isValid() == true) {
            setValidPhone(true);
        }
    }

    function fct(){
        setFocusKeyboard(true);
        console.log("fct", focusKeyboard);
        sethidePhoneIcon(true);
    }

    function updateCountry(value){
        setCountry(value.name);
        setCountryCode("+" + value.callingCode);
        setHideCountryIcon(true);
        setHideDropdownIcon(true);
    }

    function submitPhoneNumberAndGoToVerify(){
        console.log("phoneNumber", countryCode + number);
        // dispatch(routeTo(Pages.NEWSIGNUPVERIFY_SCREEN))
    }

    return (
            <KeyboardAvoidingView 
                behavior='padding'
                 style={styles.root}>
                 <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                   
                    <View style={styles.center}>
                            <SubtitleText>Please</SubtitleText>
                            <TitleText>Sign In</TitleText>
                            <SubtitleBoldText>
                                Country
                            </SubtitleBoldText>

                            <LargeButtonRectangleWithIcons 
                            text={country}
                            secondaryText={countryCode}
                            hideMainSource={hideCountryIcon}
                            hideSecondarySource={hideDropdownIcon}
                            onPress={() => setShowCountryPicker(true)}
                            mainSource={require('../../images/world_icon.png')}
                            secondarySource={require('../../images/dropdown_arrow.png')}>
                            </LargeButtonRectangleWithIcons >

                            <SubtitleBoldText>
                               Phone Number
                            </SubtitleBoldText>
                            <BodyText>
                                You will receive a verification code to confirm your device
                            </BodyText>

                            {focusKeyboard &&  <LargeButtonRectangleWithIcons hideMainSource={hidePhoneIcon} text={number} updateText={changePhoneNumber}
                             mainSource={require('../../images/dialup_icon.png')}
                             focused={focusKeyboard}
                             onPress={() => fct()}/> }
                             {!focusKeyboard &&  <LargeButtonRectangleWithIcons hideMainSource={hidePhoneIcon} text={number} updateText={changePhoneNumber}
                             mainSource={require('../../images/dialup_icon.png')}
                             focused={focusKeyboard}
                             onPress={() => fct()}/> }              
                    </View>
                    {validPhone && <View style={styles.bottom}>
                        <RoundedButton  onPress={onSignUp}/>
                    </View>}
                    <CountryPicker
                      style={styles.scrollViewContainer}
                      placeholder={""}
                      visible={showCountryPicker}
                      onSelect={(value)=> updateCountry(value)}
                      translation='eng'
                      onClose={() => setShowCountryPicker(false)}
                    />
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
    );
}