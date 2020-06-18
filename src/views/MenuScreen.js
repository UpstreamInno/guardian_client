import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {MediumTitleText} from "../components/MediumTitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";
import {SubtitleBoldText} from "../components/SubtitleBoldText";
import {LargeButtonRectangle} from "../components/LargeButtonRectangle";
import {MediumButton} from "../components/MediumButton";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);',
        paddingTop: 45,
    },
    topContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 25
    },
    container: {
        flex: 6,
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
        marginBottom: 20
    },
    buttonStyling:{
        padding:10
    },
    img:{
        width: 45,
        height: 45
    }

});

export default function MenuScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.topContainer}>
                <Image style={styles.img}
                    source={require("../../images/logo_black.png")}/>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <MediumTitleText>Menu</MediumTitleText>
                    <LargeButtonRectangle text={"Alert History"} onPress={() => dispatch(routeTo(Pages.HOME))}/>
                    <LargeButtonRectangle text={"Perform Checkup"} onPress={() => dispatch(routeTo(Pages.HOME))}/>
                    <LargeButtonRectangle text={"Health tips"} onPress={() => dispatch(routeTo(Pages.HOME))}/>
                    <LargeButtonRectangle text={"About"} onPress={() => dispatch(routeTo(Pages.HOME))} />
                    <LargeButtonRectangle text={"Permissions"} onPress={() => dispatch(routeTo(Pages.PERMISSION_SCREEN))}/>
                </View>
            </View>
            <View style={styles.bottom}>
                <MediumButton text={"Close"} onPress={() => dispatch(routeTo(Pages.HOME))}/>
            </View>
        </SafeAreaView>
    );
}