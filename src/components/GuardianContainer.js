import React, {useEffect} from "react";
import {Button, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Session from "Lib/models/Session";

import {routeTo} from "Store/actions";
import DebugMenu from "Components/DebugMenu";
import HomeScreen from "Components/HomeScreen";
import OtpScreen from "Components/OtpScreen";
// import SignupScreen from "Components/SignupScreen";
import LocationScreen from "Components/LocationScreen";
import NotificationScreen from "Components/NotificationScreen";
import AlertScreen from "Components/AlertScreen";
import ReportScreen from "Components/SymptomSurveyScreen";
import ActionCompleteScreen from "Components/ActionCompleteScreen";
import {Pages} from "Lib/Pages";
import WelcomeScreen from "../views/WelcomeScreen";
import LogoScreen from "../views/LogoScreen";
import ContactTracingScreen from "../views/ContactTracingScreen";
import LoginScreen from "../views/LoginScreen";
import YourInformationScreen from "../views/YourInformationScreen";
import LanguageScreen from "../views/LanguageScreen";
import PermissionScreen from "../views/PermissionScreen";
import ConsentLocationScreen from "../views/ConsentLocationScreen";
import ConsentNotificationScreen from "../views/ConsentNotificationScreen";
import MenuScreen from "../views/MenuScreen";
import SymptomCheckupScreen from '../views/SymptomCheckupScreen';
import TutorialScreen from "../views/TutorialScreen";
import NewSignupScreen from "../views/NewSignupScreen";
import NewSignupVerifyScreen from "../views/NewSignupVerifyScreen";

export default function GuardianContainer() {
  const { currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      let session = await Session.read();
      alert("Use effect" + JSON.stringify(session));
      if(session.seenTutorial == false){
        dispatch(routeTo(Pages.LOGO_SCREEN))
      } else if(session.accessToken != null){
        dispatch(routeTo(Pages.HOME));
      } else if(session.accessToken == null){
         dispatch(routeTo(Pages.NEWSIGNUP_SCREEN));
      }
    };
    fetchData();
  },[]);

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
      return <NotificationScreen/>;
    case Pages.MESSAGE_DETAILS:
      return placeholder();
    case Pages.SYMPTOM_SURVEY:
      return <ReportScreen />;
    case Pages.SURVEY_COMPLETE:
      return <ActionCompleteScreen />;
    case Pages.DEBUG_MENU:
      return <HomeScreen />;

    // New UI
    case Pages.LOGO_SCREEN:
      return <LogoScreen/>;
    case Pages.WELCOME_SCREEN:
      return <TutorialScreen/>;
    case Pages.CONTACT_TRACING_SCREEN:
      return <ContactTracingScreen/>;
    case Pages.YOUR_INFORMATION_SCREEN:
      return <YourInformationScreen/>;
    case Pages.LOGIN_SCREEN:
      return <LoginScreen/>;
    case Pages.LANGUAGE_SCREEN:
      return <LanguageScreen/>;
    case Pages.PERMISSION_SCREEN:
      return <PermissionScreen/>;
    case Pages.LOCATION_CONSENT:
      return <ConsentLocationScreen/>;
    case Pages.NOTIFICATION_CONSENT:
      return <ConsentNotificationScreen/>;
    case Pages.MENU_SCREEN:
      return <MenuScreen/>;
    case Pages.SYMPTOM_CHECKUP_SCREEN:
      return <SymptomCheckupScreen/>; 
    case Pages.NEWSIGNUP_SCREEN:
      return <NewSignupScreen/>;
    case Pages.NEWSIGNUPVERIFY_SCREEN:
      return <NewSignupVerifyScreen/>;

    default:
      return <LogoScreen />;
  }
}
