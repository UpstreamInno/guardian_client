import React from "react";
import { useDispatch } from "react-redux";
import { routeTo } from "Store/actions";
import { Pages } from "Components/GuardianContainer"

const HomeScreen = () => {
  const dispatch = useDispatch();
  dispatch(routeTo(Pages.DEBUG_MENU));

  return <></>;
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
