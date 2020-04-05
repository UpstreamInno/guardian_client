import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import Colors from "../constants/Colors";
import BaseTextStyle from "../constants/BaseTextStyle";
import {AntDesign} from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
let resendOtpTimerInterval;

const OtpScreen = () => {
  const [code, setCode] = useState("");
  const otpRef = useRef(null);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

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
    setCode("");
    otpRef.current.focusField(0);

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
  };

  const onSubmit = () => {
    // resend OTP Api call
    // todo
    console.log('todo: Send OTP');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os === "ios" ? "padding" : "height"}
      style={styles.avoidingKeyboard}
    >
      <LinearGradient
        colors={Colors.popupBackground}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          <Text style={BaseTextStyle.title}>Verification Code</Text>
          <Text style={[styles.subtitleStyle, BaseTextStyle.subtitle]}>Enter the OTP sent to your phone</Text>

          <OTPInputView
            ref={otpRef}
            style={styles.otpContainer}
            pinCount={6}
            code={code}
            onCodeChanged={code => {
              setCode(code)
            }}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.outlineInputStyle}
            codeInputHighlightStyle={styles.outlineInputHighlightStyle}
            onCodeFilled={(code => {
              console.log(`Code is ${code}, you are good to go!`)
            })}
          />

          <Text style={[styles.resendTimerStyle, BaseTextStyle.heading]}>Enter your code
            ({resendButtonDisabledTime}s)</Text>

          <TouchableOpacity onPress={onSubmit}>
            <AntDesign style={styles.sendButtonStyle} name="rightcircle" size={50} color="white"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={onResend}>
            <Text style={[styles.resendStyle, BaseTextStyle.heading]}>Resend code</Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidingKeyboard: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  subtitleStyle: {
    marginTop: 50
  },

  otpContainer: {
    width: '80%',
    height: 70,
    marginTop: 40
  },

  outlineInputStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    marginStart: 3,
    marginEnd: 3,
    color: '#000',
  },

  outlineInputHighlightStyle: {
    borderColor: "#5670cf",
  },

  resendTimerStyle: {
    marginTop: 10
  },

  sendButtonStyle: {
    marginTop: 20
  },

  resendStyle: {
    marginTop: 10
  }
});


export default OtpScreen;
