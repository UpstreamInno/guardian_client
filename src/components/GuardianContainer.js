import React from "react";
import { Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { routeTo } from "Store/actions";
import DebugMenu from "Components/DebugMenu";
import HomeScreen from "Components/HomeScreen";
import OtpScreen from "Components/OtpScreen";
import SignupScreen from "Components/SignupScreen";
import LocationScreen from "Components/LocationScreen";
import AlertScreen from "Components/AlertScreen";
import ReportScreen from "Components/SymptomSurveyScreen.js";
import ActionCompleteScreen from "Components/ActionCompleteScreen";
import { Pages } from "Lib/Pages";

export default function GuardianContainer() {
  const { currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  // TODO: remove this when other pages are complete!
  const placeholder = (page) => {
    return (
      <>
        <Text>Placeholder for {page} screen</Text>
        <Button
          title="Go back to Debug"
          onPress={() => dispatch(routeTo(Pages.DEBUG_MENU))}
        />
      </>
    );
  };

  switch (currentPage) {
    case Pages.HOME:
      return <HomeScreen />;
    case Pages.SIGNUP:
      return <SignupScreen />;
    case Pages.SIGNUP_VERIFY:
      return <OtpScreen />;
    case Pages.ALERT_NOTIFICATION:
      return <AlertScreen />;
    case Pages.CONSENT_LOCATION:
      return <LocationScreen />;
    case Pages.SIGNUP_COMPLETE:
      return <ActionCompleteScreen />;
    case Pages.CONSENT_NOTIFICATION:
      return placeholder();
    case Pages.MESSAGE_DETAILS:
      return placeholder();
    case Pages.SYMPTOM_SURVEY:
      return <ReportScreen />;
    case Pages.SURVEY_COMPLETE:
      return <ActionCompleteScreen />;
    case Pages.DEBUG_MENU:
      return <DebugMenu />;
    default:
      return <LocationScreen />;
  }
}
