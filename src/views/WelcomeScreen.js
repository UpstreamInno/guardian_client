import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    backContainer: {
        flex: 1,
        alignItems: 'flex-start'
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
        alignItems: 'center'
    }
});

export default function WelcomeScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => dispatch(routeTo(Pages.LOGO_SCREEN))}>
                    <Image
                        source={require("../../images/buttons/Button_Back.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <ScrollView>
                        <SubtitleText>Welcome to</SubtitleText>
                        <TitleText>Project{'\n'}Guardian</TitleText>
                        <BodyText>
                            Donec id blandit erat, vel sagittis quam. In hac habitasse platea dictumst. Maecenas sed
                            tellus vel eros laoreet ornare eu id dui. Integer ac nisl nec nisi luctus consequat in et
                            risus.
                        </BodyText>
                        <BodyText>
                            Suspendisse iaculis nulla libero, ac tempus leo venenatis eget. Nulla tristique ultricies
                            mauris, id iaculis mi sollicitudin in. Proin libero velit, finibus scelerisque dui ac.
                        </BodyText>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    onPress={() => dispatch(routeTo(Pages.CONTACT_TRACING_SCREEN))}
                    style={{alignSelf: 'flex-end'}}
                >
                    <Image
                        source={require("../../images/buttons/Button_LearnMore.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(routeTo(Pages.LOGIN_SCREEN))}>
                    <Image
                        source={require("../../images/buttons/Button_Login.png")}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}