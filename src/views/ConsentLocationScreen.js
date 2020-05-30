import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {BodyText} from "../components/BodyText";
import {RoundedButton} from "../components/RoundedButton";
import {BackButtonSmall} from "../components/BackButtonSmall";
import ToggleSwitch from 'toggle-switch-react-native';
import * as Permissions from "expo-permissions";
import { configureBackgroundLocation } from "Lib/Location";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 25
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
        alignItems: 'center',
        margin: 40
    }
});

export default function ConsentLocationScreen() {
    const dispatch = useDispatch();
    const [hasPermission, setPermission] = useState(false);

    useEffect(() => {
        console.log("ConsentNotificationScreen");
        const checkPermissions = async () => {
            const { status } = await Permissions.getAsync(Permissions.LOCATION);
            if (status === 'granted') {
                setPermission(true);
            } else {
                setPermission(false);
                // alert('Hey! You might want to enable notifications for my app, they are good.');
            }
        };
     
        checkPermissions();
    });

    async function changeToggleValue(isOn) {
        console.log("changed to : ", isOn);
        if(isOn == true){
            configureBackgroundLocation();
        }
        setPermission(isOn);

        // const { status } = await Permissions.getAsync(Permissions.LOCATION);
        // if (status === 'granted') {
        //     setPermission(true);
        // } else {
        //     setPermission(false)
        //     // alert('Hey! You might want to enable notifications for my app, they are good.');
        // }
    }


    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.backContainer}>
                <BackButtonSmall style={styles.root} onPress={() => dispatch(routeTo(Pages.NOTIFICATION_CONSENT))}/>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <ScrollView>
                        <TitleText style={{width: '80%'}}>Location{'\n'}Permission</TitleText>
                         <ToggleSwitch
                          isOn={hasPermission}
                          onColor="#E1B047"
                          offColor="#878787"
                          label="Location"
                          labelStyle={{ color: "black", fontWeight: 'bold', fontSize: 24, marginRight: 100, marginVertical: 40}}
                          size="large"
                          onToggle={isOn =>  changeToggleValue(isOn)}
                        />
                        <BodyText>
                            Suspendisse iaculis nulla libero, ac tempus leo venenatis eget. Nulla tristique ultricies
                            mauris, id iaculis mi sollicitudin in.
                        </BodyText>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bottom}>
                <RoundedButton onPress={() => dispatch(routeTo(Pages.DEBUG_MENU))}>
                </RoundedButton>
            </View>
        </SafeAreaView>
    );
}