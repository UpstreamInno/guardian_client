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
import {request, PERMISSIONS, checkNotifications} from 'react-native-permissions';
import * as Permissions from "expo-permissions";


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingTop: 25,
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
        margin:40
    }
});

export default function ConsentNotificationScreen() {
    const dispatch = useDispatch();
    const [hasPermission, setPermission] = useState(false);

    useEffect(() => {
        console.log("ConsentNotificationScreen");
        // checkNotifications().then(({status, settings}) => {
        // console.log("statusnotif", status);
        //     if(status === "granted"){
        //         setPermission(true);
        //     }
        // });
        const checkPermissions = async () => {
            const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            if (status === 'granted') {
                setPermission(true);
            } else {
                setPermission(false);
            }
        };
     
        checkPermissions();
        
    });



    async function changeToggleValue(isOn) {
        console.log("changed to : ", isOn);
        if(isOn == true){
            let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        setPermission(isOn);
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.backContainer}>
                <BackButtonSmall style={styles.root} onPress={() => dispatch(routeTo(Pages.PERMISSION_SCREEN))}/>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <ScrollView>
                        <TitleText style={{width: '80%'}}>Notification{'\n'}Permisson</TitleText>
                        <ToggleSwitch
                          isOn={hasPermission}
                          onColor="#E1B047"
                          offColor="#878787"
                          label="Notifications"
                          labelStyle={{ color: "black", fontWeight: 'bold', fontSize: 24, marginRight: 100, marginVertical: 40}}
                          size="large"
                          onToggle={isOn =>  changeToggleValue(isOn)}
                        />
                        <BodyText>
                           We will ask you how you are doing once a day through your notifications.
                        </BodyText>
                        <BodyText>
                           
                        </BodyText>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bottom}>
                <RoundedButton onPress={() => dispatch(routeTo(Pages.LOCATION_CONSENT))}>
                </RoundedButton>
            </View>
        </SafeAreaView>
    );
}