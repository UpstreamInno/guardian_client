import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";
import {setTutorialPage} from "../store/actions";
import {TUTORIAL_PAGE_CONTACT_TRACING} from "../views/TutorialScreen";
import {BackButtonSmall} from "../components/BackButtonSmall";
import {LargeButton} from "../components/LargeButton";
import {NextButtonMedium} from "../components/NextButtonMedium";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingTop: 25,
    },
    backContainer: {
        flex: 1,
         backgroundColor: '#F0F0F0',
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
        marginVertical: 15,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    }
});

export default function WelcomeScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.backContainer}>
                 <BackButtonSmall style={styles.backContainer}
                 onPress={() => dispatch(routeTo(Pages.LOGO_SCREEN))}/> 
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
                <NextButtonMedium  style={{alignSelf: 'flex-end'}}
                 text="Learn more" onPress={() => dispatch(setTutorialPage(TUTORIAL_PAGE_CONTACT_TRACING))}/>
            </View>

        </SafeAreaView>
    );
}
