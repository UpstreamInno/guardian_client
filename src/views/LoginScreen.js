import React from "react";
import {Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {SubtitleBoldText} from "../components/SubtitleBoldText";
import {BodyText} from "../components/BodyText";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: '15%'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default function LoginScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.root}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={styles.center}>
                        <SubtitleText>Please,</SubtitleText>
                        <TitleText style={{width: '50%'}}>Sign In</TitleText>
                        <SubtitleBoldText>Country</SubtitleBoldText>
                        <TextInput
                            keyboardType="numeric"
                        />
                        <SubtitleBoldText>Phone Number</SubtitleBoldText>
                        <BodyText>
                            You will receive a verification code to confirm your device.
                        </BodyText>
                        <TextInput
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={() => dispatch(routeTo(Pages.LOGIN_SCREEN))}>
                            <Image
                                source={require("../../images/buttons/Button_NextArrow.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}