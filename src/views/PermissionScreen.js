import {Image, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, View, Text} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {routeTo} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";
import {LargeButton} from "../components/LargeButton"
import {MenuButton} from "../components/MenuButton";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);',
        paddingTop: 85,
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
        alignItems: 'center', 
        marginBottom: 40
    },
    item: {
        padding: 20,
        marginVertical: 4,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    textItem: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontFamily: "noto-sans",
        fontSize: 18,
    }
});

const DATA = [
  {
    id: '1',
    title: 'Limpsum sit amet dolor',
  },
  {
    id: '2',
    title: 'Limpsum sit amet dolor',
  }
];

export default function PermissionScreen() {
    const dispatch = useDispatch();
    function Item({ title }) {
      return (
        <View style={styles.item}>
          <Image
            source={require("../../images/inactive_icon.png")}
          />
          <Text style={styles.textItem}>{title}</Text>
        </View>
      );
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <View style={styles.center}>
                    <ScrollView>
                        <TitleText>Before we{'\n'}get started</TitleText>
                        <BodyText>
                            Donec id blandit erat, vel sagittis quam. In hac habitasse platea dictumst. Maecenas sed
                            tellus vel eros laoreet ornare eu id dui. 
                        </BodyText>
                    </ScrollView>
                </View>
            </View>
             <View style={{...styles.container, marginTop:20}}>
                <View style={styles.center}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </View>
                 <BodyText>
                    Donec id blandit erat, vel sagittis quam. In hac habitasse platea dictumst.
                 </BodyText>
             </View>
           
            <View style={styles.bottom}>
            <LargeButton text={"Set permission"} onPress={() => dispatch(routeTo(Pages.LOCATION_CONSENT))}/>
            </View>
        </SafeAreaView>
    );
}