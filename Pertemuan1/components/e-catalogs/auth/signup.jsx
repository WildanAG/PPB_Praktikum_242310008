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
import { ADD_USER } from "./API";
import { Header } from "./components";
import { Buttons, InputText, TextPassword } from "./formUI";
import { style_auth } from "./styles";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validasi Username
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username cannot be empty");
      return;
    }

    if (username.length < 3) {
      Alert.alert(
        "Validation Error",
        "Username must be at least 3 characters long",
      );
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      Alert.alert(
        "Validation Error",
        "Username can only contain letters, numbers, and underscores",
      );
      return;
    }

    // Validasi Email
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email cannot be empty");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    // Validasi Password
    if (!password.trim()) {
      Alert.alert("Validation Error", "Password cannot be empty");
      return;
    }

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      let errorMsg = "Password must:\n";
      if (!passwordValidation.hasMinLength)
        errorMsg += "• Be at least 6 characters long\n";
      if (!passwordValidation.hasLetter)
        errorMsg += "• Contain at least one letter\n";
      if (!passwordValidation.hasNumber)
        errorMsg += "• Contain at least one number";

      Alert.alert("Validation Error", errorMsg);
      return;
    }

    // Validasi Retype Password
    if (!repassword.trim()) {
      Alert.alert("Validation Error", "Please retype your password");
      return;
    }

    if (password !== repassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    // Proses Registrasi
    setIsLoading(true);

    try {
      const param = { username, email, password };

      // Wajib request ke POST https://fakestoreapi.com/users
      const results = await ADD_USER(param);

      if (results.message) {
        // Request gagal / server menolak
        setIsLoading(false);
        Alert.alert("Registration Failed", "Gagal membuat akun");
        return;
      }

      if (results.data && results.data.id) {
        // Simpan data akun secara lokal (simulasi) menggunakan AsyncStorage.
        // Catatan: ini BUKAN sesi login, hanya simulasi penyimpanan data
        // pendaftaran lokal sesuai ketentuan Latihan 1. Sesi login yang
        // sebenarnya baru dibuat saat pengguna Sign In (lihat signin.jsx).
        try {
          const registeredUser = {
            id: results.data.id,
            username,
            email,
            registeredAt: new Date().toISOString(),
          };
          await AsyncStorage.setItem(
            "registeredUser",
            JSON.stringify(registeredUser),
          );
        } catch (storageError) {
          console.warn("Error saving registered user locally:", storageError);
        }

        setIsLoading(false);
        Alert.alert(
          "Registration Successful! 🎉",
          `Welcome ${username}!\n\nYour account has been created successfully.\n\nPlease sign in to continue.`,
          [
            {
              text: "Sign In Now",
              onPress: () => {
                router.replace("/signin");
              },
            },
          ],
        );
      } else {
        setIsLoading(false);
        Alert.alert("Registration Failed", "Gagal membuat akun");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setIsLoading(false);
      Alert.alert("Registration Failed", "Gagal membuat akun");
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
            <Header title={"Sign up"} />

            {/* Form */}
            <View style={style_auth.form}>
              {/* Username Input */}
              <InputText
                data={username}
                setData={setUsername}
                placeholder="Username"
              />

              <InputText
                data={email}
                setData={setEmail}
                placeholder="Email"
                icon="mail-outline"
                keyboardType="email-address"
              />

              {/* Password Input */}
              <TextPassword password={password} setPassword={setPassword} />
              <TextPassword
                password={repassword}
                setPassword={setRePassword}
                placeholder="Retype Password"
              />

              {/* Sign In Button */}
              <Buttons
                style={[
                  style_auth.signInButton,
                  isLoading && style_auth.buttonDisabled,
                ]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <Text style={style_auth.signInButtonText}>
                  {isLoading ? "Processing..." : "Register"}
                </Text>
              </Buttons>

              {/* Divider */}
              <View style={style_auth.divider}>
                <View style={style_auth.dividerLine} />
                <Text style={style_auth.dividerText}>OR</Text>
                <View style={style_auth.dividerLine} />
              </View>

              {/* Sign Up Link */}
              <View style={style_auth.signUpContainer}>
                <Text style={style_auth.signUpText}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.replace("/signin")}>
                  <Text style={style_auth.signUpLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password minimal 6 karakter, harus ada huruf dan angka
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return {
    isValid: hasMinLength && hasLetter && hasNumber,
    hasMinLength,
    hasLetter,
    hasNumber,
  };
};