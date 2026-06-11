import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { color_list } from "../styles/StyleApps";
import { style_auth } from "./styles";

const Header = ({ title }) => {
  return (
    <View style={style_auth.header}>
      <Ionicons name="book" size={80} color={color_list.green} />
      <Text style={style_auth.title}>Readly+</Text>
      <Text style={style_auth.subtitle}>{title} to continue</Text>
    </View>
  );
};

export { Header };