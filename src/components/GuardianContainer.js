import React from "react";
import { Text, Button } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import { routeTo } from "Store/actions";
import DebugMenu from "Components/DebugMenu";
import OtpScreen from "Screens/OtpScreen"
import LocationScreen from "Screens/LocationScreen"
import AppNavigator from "../navigation/AppNavigator";

export const Pages = {
  SIGNUP: "SIGNUP",
  SIGNUP_VERIFY: "SIGNUP_VERIFY",
  SIGNUP_COMPLETE: "SIGNUP_COMPLETE",
  CONSENT_LOCATION: "CONSENT_LOCATION",
  CONSENT_NOTIFICATION: "CONSENT_NOTIFICATION",
  HOME: "HOME",
  MESSAGE_DETAILS: "MESSAGE_DETAILS",
  SYMPTOM_SURVEY: "SYMPTOM_SURVEY",
  SURVEY_COMPLETE: "SURVEY_COMPLETE",

  // TODO: hide these debug pages in release builds
  DEBUG_MENU: "DEBUG_MENU",
  DEBUG_NAVIGATOR: "DEBUG_NAVIGATOR",
}

export default function GuardianContainer() {
  const { currentPage } = useSelector(state => state);
  const dispatch = useDispatch();

  // TODO: remove this when other pages are complete!
  const placeholder = (page) => {
    return (
      <>
        <Text>Placeholder for {page} screen</ Text>
        <Button
            title="Go back to Debug"
            onPress={() => dispatch(routeTo(Pages.DEBUG_MENU))}
        />
      </>
    );
  }

  switch (currentPage) {
    case Pages.SIGNUP:
      return <LocationScreen />;
    case Pages.SIGNUP_VERIFY:
      return <OtpScreen />;
    case Pages.SIGNUP_COMPLETE:
    case Pages.CONSENT_LOCATION:
    case Pages.CONSENT_NOTIFICATION:
    case Pages.HOME:
    case Pages.MESSAGE_DETAILS:
    case Pages.SYMPTOM_SURVEY:
    case Pages.SURVEY_COMPLETE:
      return placeholder(currentPage);
    case Pages.DEBUG_MENU:
      return <DebugMenu />;
    case Pages.DEBUG_NAVIGATOR:
      return <AppNavigator />;
    default:
      return <DebugMenu />;
  }
};
