import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { t } from 'Lib/i18n';
import { routeTo } from "Store/actions";
import { Pages } from "Components/GuardianContainer"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const HomeScreen = () => {

  // Route to signin if there is no session.
  const { sessionId } = useSelector(state => state);
  const dispatch = useDispatch();

  if (!sessionId) {
    dispatch(routeTo(Pages.SIGNUP));
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Text>{t("Home")}</Text>
      <Text>Messages</Text>
    </View>
  );
};

export default HomeScreen;
