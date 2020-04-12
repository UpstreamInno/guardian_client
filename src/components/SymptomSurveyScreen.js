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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    // paddingLeft: 30,
  },
  switchContainer: {
    flex: 2,
    justifyContent: "center",
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
  },
  submitContainer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  switchBorder: {
    backgroundColor: "#3e3e3e",
    borderRadius: 17,
  },
  switchBorderOff: {
    backgroundColor: null,
  },
});

const TRACK_COLOR = { false: "#696969", true: "#32cd32" };
const THUMB_COLOR = "#fff";
const IOS_SWITCH_BG_COLOR = "#696969";

const ReportScreen = () => {
  const [symptoms, setSymptoms] = React.useState({});

  const onSubmit = () => {
    () => useDispatch({ symptoms });
  };

  const SwitchRow = ({ symptom, userFriendlyText }) => {
    return (
      <View style={styles.row}>
        <Switch
          trackColor={TRACK_COLOR}
          thumbColor={THUMB_COLOR}
          //I left the IOS background color here becasue I do not have an iphone to test this on, but I think it may be redundant given the style
          ios_backgroundColor={IOS_SWITCH_BG_COLOR}
          onValueChange={(v) => setSymptoms({ ...symptoms, [symptom]: v })}
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
        Please check any of the following symptoms you have experianced since
        your exposure
      </Text>
      <View style={styles.switchContainer}>
        <SwitchRow
          symptom="lossOfSenseOfSmell"
          userFriendlyText="Loss of Sense of Smell"
        />
        <SwitchRow symptom="cough" userFriendlyText="Cough" />
        <SwitchRow symptom="fever" userFriendlyText="Fever" />
        <SwitchRow symptom="tiredness" userFriendlyText="Tiredness" />
        <SwitchRow
          symptom="difficultyBreathing"
          userFriendlyText="Difficulty Breathing"
        />
        <SwitchRow
          symptom="pressureInChest"
          userFriendlyText="Pressure in Chest"
        />
        <SwitchRow
          symptom="testedPositive"
          userFriendlyText="I Have Tested Positive for COVID-19"
        />
      </View>
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

ReportScreen.navigationOptions = {
  title: "Report",
};

export default ReportScreen;
