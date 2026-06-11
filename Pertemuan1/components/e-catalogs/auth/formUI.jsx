import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { style_auth } from "./styles";

const InputText = ({
  data,
  setData,
  icon,
  placeholder = "",
  keyboardType = "default",
}) => {
  return (
    <View style={style_auth.inputContainer}>
      <Ionicons
        name={icon ? icon : "person-outline"}
        size={20}
        color="#666"
        style={style_auth.inputIcon}
      />
      <TextInput
        style={style_auth.input}
        placeholder={placeholder || ""}
        placeholderTextColor="#999"
        value={data}
        onChangeText={setData}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const TextPassword = ({ password, setPassword, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={style_auth.inputContainer}>
      <Ionicons
        name="lock-closed-outline"
        size={20}
        color="#666"
        style={style_auth.inputIcon}
      />
      <TextInput
        style={style_auth.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={style_auth.eyeIcon}
      >
        <Ionicons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};

const Buttons = ({ children, ...other }) => {
  return <TouchableOpacity {...other}>{children}</TouchableOpacity>;
};

export { Buttons, InputText, TextPassword };