import React, {useRef, useState} from "react";
import {Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Modal, Text, FlatList, TouchableWithoutFeedback} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useDispatch} from "react-redux";
import {routeTo,} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {SubtitleBoldText} from "../components/SubtitleBoldText";
import {BodyText} from "../components/BodyText";
import {Item} from "native-base";
import data from "../lib/Countries";

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
    },
  textStyle: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  }
});

export default function LoginScreen() {
    const dispatch = useDispatch();
    const myInput = useRef();
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [selectedCountryData, setSelectedCountryData] = useState({});

    const showModal = () => {
        setShouldShowModal(true)
    }
    const hideModal = () => {
        setShouldShowModal(false)
    }

    const renderCountryItem = (item) => {
      return <TouchableWithoutFeedback
        onPress={() => setSelectedCountryData(item)}>
        <View
          style={styles.countryStyle}>
          <Text style={{fontSize: 20}}>
            {item.name} ({item.dial_code})
          </Text>
        </View>
      </TouchableWithoutFeedback>
    }

    const renderCountryModal = () => {
      return <Modal
        animationType="slide" // fade
        transparent={false}
        visible={shouldShowModal}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderCountryItem(item)}
          />
          <TouchableOpacity
            onPress={() => hideModal()}
            style={styles.closeButtonStyle}>
            <Text style={styles.textStyle}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    }

    return (
        <SafeAreaView style={styles.root}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={styles.center}>
                        <SubtitleText>Please,</SubtitleText>
                        <TitleText style={{width: '50%'}}>Sign In</TitleText>
                        <SubtitleBoldText>Country</SubtitleBoldText>

                      <Button
                        title="Press me"
                        color="#f194ff"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                      />
                      <Image
                        source={require("../../images/ic_world.png")}
                      />
                        <TouchableOpacity
                          onPress={() => showModal()}>
                            <Text >
                                {"AAAAAAAAAAAAAAA\n"}
                                {"\n"}
                            </Text>
                        </TouchableOpacity>
                        <SubtitleBoldText>Phone Number</SubtitleBoldText>
                        <BodyText>
                            You will receive a verification code to confirm your device.
                        </BodyText>
                        <TextInput
                            keyboardType="numeric"
                        />
                      {renderCountryModal()}
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
