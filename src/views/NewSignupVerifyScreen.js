import {Image, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, View, Text} from "react-native";
import React, {useState, useEffect, useSelector} from "react";
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
        marginTop:25
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
        marginTop: 20,
    },
    scrollViewContainer: {
      backgroundColor: '#F0F0F0'
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
        alignItems: 'center',
    },
});

const RESEND_OTP_TIME_LIMIT = 60; // 30 secs
let resendOtpTimerInterval;

export default function NewSignupVerifyScreen() {
    const dispatch = useDispatch();
    const [codeExpiration, setCodeExpiration ] =  useState("");
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [phoneNumber, setPhoneNumber] = useState("+40 751 240 794");
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );
    const onSubmit = (val) => {
      console.log("on onSubmit", val);
      dispatch(userSignUpVerify(val));
    };

    useEffect(() => {
        startResendOtpTimer();
        return () => {
          if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
          }
        };
      }, [resendButtonDisabledTime]);

      const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
          if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
          } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
          }
        }, 1000);
      };

      const onResend = () => {
        setValue("");

        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();

        // resend OTP Api call
        // todo
        console.log('todo: Resend OTP');
      };


    function updateValue(val){
        console.log(val, val.length);
        setValue(val);
        if(val.length == 6){
            onSubmit(val);
        }
    }

    return (
        <KeyboardAvoidingView 
                behavior='padding'
                 style={styles.root}>
            <ScrollView style={styles.scrollViewContainer}>
               <View style={styles.container}>
                <BackButtonSmall style={styles.backContainer}
                 onPress={() => dispatch(routeTo(Pages.NEWSIGNUP_SCREEN))}/>  
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
                              Code expires in {resendButtonDisabledTime}s
                            </Text>
                        <MediumButton text={"Resend code"} onPress={onResend}/>
                    </View>             
                </View>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}