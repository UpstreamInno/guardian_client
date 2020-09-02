import React from "react";
import { t } from "Lib/i18n";
import { routeTo } from "Store/actions";
import { Pages } from "Components/GuardianContainer";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingBottom: 50,
    maxHeight: "100%",
  },
  switchContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 40,
  },
  submitButton: {
    width: 200,
    height: 50,
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 40,
    marginLeft: 10,
    marginRight: 10,
    color: "#ffffff",
  },
  label: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    flex: 1,
  },
  submitContainer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  switchBorderOff: {
    backgroundColor: null,
  },
});

const TRACK_COLOR = { false: "#696969", true: "#32cd32" };
const THUMB_COLOR = "#fff";
const IOS_SWITCH_BG_COLOR = "#696969";

const SymptomSurveyScreen = () => {
  const dispatch = useDispatch();

  const [symptoms, setSymptoms] = React.useState({});

  const onSubmit = () => {
    console.log("reported symptoms", symptoms);
    dispatch(routeTo(Pages.SURVEY_COMPLETE));
  };

  const switchHandler = (switchState, points) => {
    return switchState ? points : 0;
  };

  const SwitchRow = ({ symptom, userFriendlyText, points }) => {
    return (
      <View style={styles.row}>
        <Switch
          trackColor={TRACK_COLOR}
          thumbColor={THUMB_COLOR}
          //I left the IOS background color here because I do not have an iphone to test this on, but I think it may be redundant given the style
          ios_backgroundColor={IOS_SWITCH_BG_COLOR}
          onValueChange={(switchState) =>
            setSymptoms({
              ...symptoms,
              [symptom]: switchHandler(switchState, points),
            })
          }
          value={symptoms[symptom]}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
        <Text style={styles.label}>{t(userFriendlyText)}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#94e4f9", "#2d93d8"]} style={styles.container}>
      <Text style={styles.title}>
        {t(
          "Please check any of the following symptoms you have experianced in the last 5 days"
        )}
      </Text>
      <ScrollView contentContainerStyle={styles.switchContainer}>
        <SwitchRow
          symptom="lossOfSenseOfSmell"
          userFriendlyText="Loss of Sense of Smell"
          points={1}
        />
        <SwitchRow symptom="cough" userFriendlyText="Cough" points={1} />
        <SwitchRow symptom="fever" userFriendlyText="Fever" points={1} />
        <SwitchRow
          symptom="tiredness"
          userFriendlyText="Tiredness"
          points={1}
        />
        <SwitchRow
          symptom="shortnessOfBreath"
          userFriendlyText="Shortness of Breath"
          points={1}
        />
        <SwitchRow
          symptom="pressureInChest"
          userFriendlyText="Pressure in Chest"
          points={1}
        />
        <SwitchRow
          symptom="soreThroat"
          userFriendlyText="Sore Throat"
          points={1}
        />
        <SwitchRow
          symptom="runnyNose"
          userFriendlyText="Runny Nose"
          points={1}
        />
        <SwitchRow symptom="vomiting" userFriendlyText="Vomiting" points={1} />
        <SwitchRow symptom="nausea" userFriendlyText="Nausea" points={1} />
        <SwitchRow
          symptom="diarrhoea"
          userFriendlyText="Diarrhoea"
          points={1}
        />
        <SwitchRow
          symptom="closeContact"
          userFriendlyText="I have come in close contact with someone who is sick"
          points={1}
        />
        <SwitchRow
          symptom="testedPositive"
          userFriendlyText="I Have Tested Positive for COVID-19"
          points={1}
        />
      </ScrollView>
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={onSubmit}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SymptomSurveyScreen;
