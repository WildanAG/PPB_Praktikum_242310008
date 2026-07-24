import { color_list } from "../../../styles/StyleApps";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../../../constants/list_books";
import { ButtonPill } from "../../buttons";
import Cover from "./cover";
import Header from "./header";
import Sinopsis from "./sinopsis";

export default function Detail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Dicek ulang setiap halaman ini fokus/dibuka (bukan cuma sekali saat
  // mount), supaya kalau user Sign Out lalu mencoba kembali ke halaman ini
  // lewat tombol back, guard tetap berlaku dan langsung redirect.
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const checkLoginStatus = async () => {
        try {
          const userDataString = await AsyncStorage.getItem("userData");
          const loggedIn = userDataString !== null;

          if (!isActive) return;
          setIsLoggedIn(loggedIn);
          setIsCheckingAuth(false);

          if (!loggedIn) {
            // Pengguna belum Sign In -> tidak menampilkan detail buku,
            // tampilkan pesan informatif lalu arahkan ke Sign In.
            Alert.alert(
              "Login Required",
              "Kamu harus Sign In terlebih dahulu untuk melihat detail buku.",
              [
                {
                  text: "Sign In",
                  onPress: () => router.replace("/signin"),
                },
              ],
              { cancelable: false },
            );
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          if (!isActive) return;
          setIsLoggedIn(false);
          setIsCheckingAuth(false);
          router.replace("/signin");
        }
      };

      checkLoginStatus();

      return () => {
        isActive = false;
      };
    }, [id]),
  );

  const handleReadBook = async (book_id, is_free) => {
    // Guard halaman sudah memastikan pengguna login saat sampai di sini,
    // pengecekan tetap dipertahankan sebagai lapisan keamanan tambahan.
    try {
      const userDataString = await AsyncStorage.getItem("userData");

      if (!userDataString) {
        Alert.alert(
          "Login Required",
          "Please sign in to read this book",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Sign In", onPress: () => router.push("/signin") },
          ],
          { cancelable: true },
        );
        return;
      }

      if (is_free) {
        router.push(`/books/read/${book_id}`);
      } else {
        router.push(`/books/subscribe/${book_id}`);
      }
    } catch (error) {
      console.error("Error in handleReadBook:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // ---- Sedang memeriksa status login ----
  if (isCheckingAuth) {
    return (
      <View style={styles_detail.loadingContainer}>
        <ActivityIndicator size="large" color={color_list.orange} />
      </View>
    );
  }

  // ---- Belum login: jangan render detail buku sama sekali ----
  if (!isLoggedIn) {
    return (
      <View style={styles_detail.loadingContainer}>
        <ActivityIndicator size="large" color={color_list.orange} />
        <Text style={styles_detail.redirectText}>
          Mengarahkan ke halaman Sign In...
        </Text>
      </View>
    );
  }

  // ---- Sudah login: tampilkan detail buku seperti biasa ----
  return (
    <ImageBackground source={book?.img} style={styles_detail.background}>
      <StatusBar style="auto" barStyle={"light-content"} />
      {Platform.OS === "ios" ? (
        <BlurView intensity={80} tint="dark" style={styles_detail.overlay} />
      ) : (
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.9)"]}
          style={styles_detail.overlay}
        />
      )}
      <SafeAreaView style={styles_detail.container}>
        <Header book={book} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Cover book={book} />
          <Sinopsis book={book} />
        </ScrollView>
        <ButtonPill
          color={book.is_free ? color_list.white : color_list.orange}
          onAction={() => handleReadBook(book.id, book.is_free)}
        >
          <View style={styles_detail.button_container}>
            {book.is_free ? (
              <>
                <Feather name="book-open" size={20} color={color_list.green} />
                <Text style={styles_detail.button_text}>Read Book</Text>
              </>
            ) : (
              <>
                <FontAwesome
                  name="credit-card"
                  size={20}
                  color={color_list.white}
                />
                <Text
                  style={{
                    ...styles_detail.button_text,
                    color: color_list.white,
                  }}
                >
                  Subscribe
                </Text>
              </>
            )}
          </View>
        </ButtonPill>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles_detail = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 15 : 25,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayAndroid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay untuk Android
  },
  button_container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    alignContent: "center",
  },
  button_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: color_list.green,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: color_list.black || "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  redirectText: {
    color: color_list.cream || "#eee",
    marginTop: 12,
    fontSize: 14,
  },
});