import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";

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
    }
});

export default function LogoScreen() {
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
