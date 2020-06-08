import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import { userSignUpVerify } from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";
import {LargeButtonRectangle} from "../components/LargeButtonRectangle";
import {LargeButtonRectangleWithIcons} from "../components/LargeButtonRectangleWithIcons";
import {RoundedButton} from "../components/RoundedButton";
import {MediumButton}  from "../components/MediumButton";
import {BackButtonSmall} from "../components/BackButtonSmall";

import { Countdown } from 'react-native-countdown-text';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 6;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 55,
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    container: {
        flex: 4,
        paddingHorizontal: 25,
        marginTop: 45
    },
    center: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    bottom: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 40,
        marginRight: 40
    },
    title: {textAlign: 'center', fontSize: 30},
      codeFiledRoot: {marginTop: 20},
      cell: {
        width: 50,
        height: 60,
        lineHeight: 58,
        fontSize: 44,
        borderColor: '#00000030',
        textAlign: 'center',
      },
    focusCell: {
        borderColor: '#000',
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginVertical: 20
    },
    textStyle:{
        fontFamily: "noto-sans",
        fontSize: 16,
        marginVertical: 10
    },
    absoluteView: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default function NewSignupVerifyScreen() {
    const dispatch = useDispatch();
    const [codeExpiration, setCodeExpiration ] =  useState("");
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [phoneNumber, setPhoneNumber] = useState("+40 751 240 794");

    const onSubmit = () => {
      dispatch(userSignUpVerify(value));
    };

    useEffect(() => {
        var duration = 120 ;
        var start = Date.now(),
        diff,
        minutes,
        seconds;
        setInterval(function () {
            diff = duration - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            // display.textContent = minutes + ":" + seconds; 
            // console.log(minutes +":"+ seconds, value);
            setCodeExpiration(minutes+":"+seconds);
            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        }, 1000);
    },[]);

    function updateValue(value){
        console.log(value);
        setValue(value);
        if(value.length == 6){
            onSubmit();
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <BackButtonSmall onPress={() => dispatch(routeTo(Pages.NEWSIGNUP_SCREEN))}/>  
            <View style={styles.container}>
                <View style={styles.center}>
                        <SubtitleText>Please</SubtitleText>
                        <TitleText>Verify Device</TitleText>
                        <BodyText>
                            A verification code has been sent to {phoneNumber}
                        </BodyText>
                        <CodeField
                            {...props}
                            value={value}
                            onChangeText={updateValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFiledRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                             <View>
                               <Image source={require('../../images/buttons/verification_container.png')}  />
                                <View style={styles.absoluteView}>
                                  <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                  </Text>
                                  </View>
                              </View>
                            )}
                          />
                          <View style={styles.infoContainer}>
                            <Text style={styles.textStyle}>
                              Code expires in {codeExpiration}
                            </Text>

                            <MediumButton text={"Resend code"} onPress={() => alert("resend code")}/>
                          </View>
                        
                                          
                </View>
            </View>
        </SafeAreaView>
    );
}