import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {BodyText} from "../components/BodyText";
import {setTutorialPage} from "../store/actions";
import {TUTORIAL_PAGE_CONTACT_TRACING} from "../views/TutorialScreen";
import {BackButtonSmall} from "../components/BackButtonSmall";

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
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default function YourInformationScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.backContainer}>
                 <BackButtonSmall style={styles.backContainer}
                 onPress={() => dispatch(routeTo(Pages.LANGUAGE_SCREEN))}/>
            </View>
            <View style={styles.container}>
                <View style={styles.center}>
                    <ScrollView>
                        <TitleText style={{width: '80%'}}>Your{'\n'}Information</TitleText>
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
        </SafeAreaView>
    );
}
