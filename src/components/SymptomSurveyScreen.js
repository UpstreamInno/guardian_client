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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20px",
    backgroundColor: "#fff",
    paddingLeft: "30px",
  },
  switchContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "20px",
    paddingLeft: "30px",
  },
  submitButton: {
    width: "200px",
    height: "50px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "10px",
  },
  submitButtonText: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    textAlign: "left",
    margin: 10,
    color: "#ffffff",
  },
  label: {
    fontSize: "18px",
    color: "#FFFFFF",
    marginLeft: "10px",
  },
  row: {
    flex: "0",
    flexDirection: "row",
    marginBottom: "20px",
  },
  submitContainer: {
    flex: "1",
    paddingBottom: "20px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const TRACK_COLOR = { false: "#FFF", true: "#81b0ff" };
const THUMB_COLOR = "#f5dd4b";
const IOS_SWITCH_BG_COLOR = "#3e3e3e";

const ReportScreen = () => {
  const [symptoms, setSymptoms] = React.useState({});

  const onSubmit = () => {};

  const toggleSwitch = () => {};

  const SwitchRow = ({ symptom }) => {
    <View style={styles.row}>
      <Switch
        trackColor={TRACK_COLOR}
        thumbColor={THUMB_COLOR}
        ios_backgroundColor={IOS_SWITCH_BG_COLOR}
        onValueChange={(v) => setSymptoms({ ...symptoms, [symptom]: v })}
        value={symptoms[symptom]}
      />
      <Text style={styles.label}>Loss of Sense of Smell</Text>
    </View>;
  };

  return (
    <LinearGradient colors={["#000", "#000"]} style={styles.container}>
      <Text style={styles.title}>
        Since the exposure, have you felt any of the following?
      </Text>
      <View style={styles.switchContainer}>
        <SwitchRow symptom="lossOfSenseOfSmell" />
        <SwitchRow symptom="cough" />
        <SwitchRow symptom="fever" />
        <SwitchRow symptom="tiredness" />
        <SwitchRow symptom="difficultyBreathing" />
        <SwitchRow symptom="pressureInChest" />
        <SwitchRow symptom="testedPositive" />
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={onSubmit}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit your symtoms</Text>
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
