import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {RoundedButton} from "../components/RoundedButton";
import {ChooseLanguageButton} from "../components/ChooseLanguageButton";
import ReactNativePickerModule from 'react-native-picker-module'


const styles = StyleSheet.create({
   
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    center: {
        flex: 6,
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 18,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon

    },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default function LanguageScreen() {
    const [languageIndex, setLanguageIndex] = useState(0);
    const dispatch = useDispatch();
    let pickerRef = null
    const lang = [ "English", "Spanish", "French" ];
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Image
                        source={require("../../images/logo_blue.png")}
                        style={{width: 75, height: 75, marginBottom: 15}}
                    />
                    <TitleText>Project{'\n'}Guardian</TitleText>
                    <ChooseLanguageButton text={lang[languageIndex]} onPress={() => pickerRef.show()}/>
                    <ReactNativePickerModule
                      pickerRef={e => (pickerRef = e)}
                      selectedValue={languageIndex}
                      title={"Select a language"}
                      items={lang}
                      onValueChange={(valueText, index) => {
                        setLanguageIndex(index);
                    }}/>
                </View>
                <View style={styles.bottom}>
                    <RoundedButton  onPress={() => dispatch(routeTo(Pages.WELCOME_SCREEN))}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
