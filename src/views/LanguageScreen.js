import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const lang = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'france', label: 'French' },
];
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
        alignItems: 'center'
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
    const [language, setLanguage] = useState("english");
    const dispatch = useDispatch();
    
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <Image
                        source={require("../../images/logo2.png")}
                        style={{width: 73, height: 75, marginBottom: 15}}
                    />
                    <TitleText>Project{'\n'}Guardian</TitleText>
                     <RNPickerSelect
                        onValueChange={(value) => setLanguage(value)}
                          placeholder={{
                          label: 'Select a language...',
                          value: null,
                        }}
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        value={language}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        items={[ {value: 'english', label: 'English' },
                          { value: 'spanish', label: 'Spanish' },
                          { value: 'france', label: 'French' }]}
                         Icon={() => {
                          return <MaterialCommunityIcons name="menu-down" size={24} color="black" />;
                        }}
                    />
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={() => dispatch(routeTo(Pages.WELCOME_SCREEN))}>
                        <Image
                            source={require("../../images/buttons/Button_NextArrow.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
