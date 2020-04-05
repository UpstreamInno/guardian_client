import {StyleSheet} from "react-native";
import Colors from "./Colors";

const title = 36;
const subtitle = 16;
const heading = 12;

export default StyleSheet.create({
  title: {
    fontSize: title,
    fontWeight: 'bold',
    color: Colors.lightText
  },
  subtitle: {
    fontSize: subtitle,
    color: Colors.lightText
  },
  heading: {
    fontSize: heading,
    fontWeight: 'bold',
    color: Colors.lightText
  }
});
