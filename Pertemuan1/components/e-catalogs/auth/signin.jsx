import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { AUTH_USER } from "./API";
import { Header } from "./components";
import { Buttons, InputText, TextPassword } from "./formUI";
import { style_auth } from "./styles";

export default function Signin() {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    // Validasi input
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    const results = await AUTH_USER({ username, password });
    console.log("Login response:", results);

    if (results.message) {
      Alert.alert("Error", results.message);
      setIsLoading(false);
      return;
    } else if (results.data && results.data.token) {
      // Simpan token dan user data ke AsyncStorage
      try {
        const userData = {
          username: username,
          token: results.data.token,
          loginTime: new Date().toISOString(),
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem("authToken", results.data.token);

        setIsLoading(false);
        Alert.alert("Success", `Welcome back, ${username}!`, [
          {
            text: "OK",
            onPress: () => {
              // Redirect ke halaman tabs
              router.replace("/main-apps");
            },
          },
        ]);
      } catch (error) {
        console.error("Error saving user data:", error);
        setIsLoading(false);
        Alert.alert("Error", "Failed to save login data");
      }
    } else {
      setIsLoading(false);
      Alert.alert("Error", "Invalid response from server");
    }
  };

  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} hidden={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style_auth.container}
      >
        <ScrollView
          contentContainerStyle={style_auth.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={style_auth.content}>
            {/* Header */}
            <Header title={"Sign in"} />

            {/* Form */}
            <View style={style_auth.form}>
              {/* Username Input */}
              <InputText
                data={username}
                setData={setUsername}
                placeholder="Username"
              />

              {/* Password Input */}
              <TextPassword password={password} setPassword={setPassword} />

              {/* Forgot Password */}
              <TouchableOpacity style={style_auth.forgotPassword}>
                <Text style={style_auth.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <Buttons
                style={[
                  style_auth.signInButton,
                  isLoading && style_auth.buttonDisabled,
                ]}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                <Text style={style_auth.signInButtonText}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </Buttons>

              {/* Divider */}
              <View style={style_auth.divider}>
                <View style={style_auth.dividerLine} />
                <Text style={style_auth.dividerText}>OR</Text>
                <View style={style_auth.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <Buttons style={style_auth.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={style_auth.socialButtonText}>
                  Continue with Google
                </Text>
              </Buttons>

              <Buttons style={style_auth.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                <Text style={style_auth.socialButtonText}>
                  Continue with Facebook
                </Text>
              </Buttons>

              {/* Sign Up Link */}
              <View style={style_auth.signUpContainer}>
                <Text style={style_auth.signUpText}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/signup")}>
                  <Text style={style_auth.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}