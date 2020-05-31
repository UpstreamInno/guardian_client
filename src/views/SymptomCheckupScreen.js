import {Image, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {routeTo} from "Store/actions";
import {TitleText} from "../components/TitleText";
import {Pages} from "../lib/Pages";
import {SubtitleText} from "../components/SubtitleText";
import {BodyText} from "../components/BodyText";
import {CardIcons} from "../components/CardIcons"

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingTop: 80,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
    },
    container: {
        marginLeft: 25,
        marginRight: 25
    }
});


const DATA = [
  {
    id: '1',
    title: 'Fever',
  },
  {
    id: '2',
    title: 'Shortness of breath',
  },
   {
    id: '1',
    title: 'Fever',
  },
  {
    id: '2',
    title: 'Shortness of breath',
  }
];

export default function SymptomCheckupScreen() {
    const dispatch = useDispatch();
    const [feverToggle, setFeverToggle] = useState(false);
    const [breathToggle, setBreathToggle] = useState(false);
    const [coughToggle, setCoughToggle] = useState(false);
    const [tiredToggle, setTiredToggle] = useState(false);
    const [painToggle, setPainToggle] = useState(false);
    const [throatToggle, setThroatToggle] = useState(false);
    const [nauseaToggle, setNauseaToggle] = useState(false);
    const [diarrhoeaToggle, setDiarrhoeaToggle] = useState(false);
    const [noseToggle, setNoseToggle] = useState(false);
    const [sneezeToggle, setSneezeToggle] = useState(false);

    function Item({ title, id }) {
      return (
        <CardIcons child={id} text={title} onToggle={clickToggle} toggleState={false} />
      );
    }

    function clickToggle({ state, refs}){
        console.log("clickToggle", { state, refs});
        if(refs  == "Fever"){
            setFeverToggle(state);
            // alert("clickToggle" + state);
        }
        if(refs == "Shortness of breath"){
            setBreathToggle(state);
            // alert("clickToggle" + state);
        }  
        if(refs == "Dry cough"){
            // alert("clickToggle" + state);
            setCoughToggle(state);
        }
         if(refs == "Tiredness"){
            // alert("clickToggle" + state);
            setTiredToggle(state);
        }
         if(refs == "Aches & Pain"){
            // alert("clickToggle" + state);
            setPainToggle(state);
        }
         if(refs == "Sore Throat"){
            // alert("clickToggle" + state);
            setThroatToggle(state);
        }
         if(refs == "Nausea"){
            // alert("clickToggle" + state);
            setNauseaToggle(state);
        }
         if(refs == "Diarrhoea"){
            // alert("clickToggle" + state);
            setDiarrhoeaToggle(state);
        }
         if(refs == "Runny nose"){
            // alert("clickToggle" + state);
            setNoseToggle(state);
        }
         if(refs == "Sneezing"){
            // alert("clickToggle" + state);
            setSneezeToggle(state);
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.center}>
             <ScrollView contentcontentContainerStyle={{ backgroundColor: '#E5E5E5'}}>
                    <TitleText style={styles.container}>Symptom{'\n'}Checkup</TitleText>
                        <BodyText style={styles.container}>
                            Donec id blandit erat, vel sagittis quam. In hac habitasse platea dictumst. Maecenas sed
                            tellus vel eros laoreet ornare eu id dui. 
                        </BodyText>
                    <View style={styles.container}>
                        <CardIcons heightCard={(feverToggle) ? 250 : 90} source={require('../../images/termometer.png')} text={"Fever"} onToggle={clickToggle} toggleState={feverToggle} />
                        <CardIcons heightCard={(breathToggle) ? 250 : 90} source={require('../../images/breath.png')} text={"Shortness of breath"} onToggle={clickToggle} toggleState={breathToggle} />
                        <CardIcons heightCard={(coughToggle) ? 250 : 90} source={require('../../images/cough.png')} text={"Dry cough"} onToggle={clickToggle} toggleState={coughToggle} />
                        <CardIcons heightCard={(tiredToggle) ? 250 : 90} source={require('../../images/tired.png')} text={"Tiredness"} onToggle={clickToggle} toggleState={tiredToggle} />
                        <CardIcons heightCard={(painToggle) ? 250 : 90} source={require('../../images/pain.png')} text={"Aches & Pain"} onToggle={clickToggle} toggleState={painToggle} />
                        <CardIcons heightCard={(throatToggle) ? 250 : 90} source={require('../../images/throat.png')} text={"Sore Throat"} onToggle={clickToggle} toggleState={throatToggle} />
                        <CardIcons heightCard={(nauseaToggle) ? 250 : 90} source={require('../../images/nausea.png')} text={"Nausea"} onToggle={clickToggle} toggleState={nauseaToggle} />
                        <CardIcons heightCard={(diarrhoeaToggle) ? 250 : 90} source={require('../../images/diarrhoea.png')} text={"Diarrhoea"} onToggle={clickToggle} toggleState={diarrhoeaToggle} />
                        <CardIcons heightCard={(noseToggle) ? 250 : 90} source={require('../../images/nose.png')} text={"Runny Nose"} onToggle={clickToggle} toggleState={noseToggle} />
                        <CardIcons heightCard={(sneezeToggle) ? 250 : 90} source={require('../../images/sneeze.png')} text={"Sneezing"} onToggle={clickToggle} toggleState={sneezeToggle} />

                    </View>
           </ScrollView>
           </View>
        </SafeAreaView>
    );
}