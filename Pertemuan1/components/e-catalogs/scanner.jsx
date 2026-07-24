import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles/StyleApps";

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.68;

// Simulasi pengambilan detail buku dari server berdasarkan isi QR code.
// Gantikan dengan pemanggilan API asli, misal: GET /books/:id
async function fetchBookByCode(code) {
  await new Promise((resolve) => setTimeout(resolve, 700)); // simulasi latensi
  return {
    id: code,
    title: "Bleach",
    author: "Tite Kubo",
    rating: 10,
    views: 100,
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  };
}

export default function Scanner() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const lockRef = useRef(false);

  const handleBarcodeScanned = useCallback(async ({ data }) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setScanned(true);
    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await fetchBookByCode(data);
      setBook(result);
    } catch (err) {
      setErrorMsg("QR Code tidak dikenali sebagai buku yang valid.");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetScan = () => {
    lockRef.current = false;
    setScanned(false);
    setBook(null);
    setErrorMsg(null);
  };

  const goToDetail = () => {
    if (!book) return;
    router.push(`/book/${book.id}`); // sesuaikan route detail buku pada project
  };

  // ---- Permission belum diberikan ----
  if (!permission) {
    return (
      <View style={[styles.container, s.center]}>
        <ActivityIndicator color={styles.color_list.green} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, s.center]}>
        <Ionicons name="qr-code-outline" size={64} color={styles.color_list.green} />
        <Text style={[styles.title, { textAlign: "center", marginTop: 16 }]}>
          Izin Kamera Diperlukan
        </Text>
        <Text style={[styles.sub_title, { textAlign: "center", marginTop: 6, marginBottom: 20 }]}>
          Aktifkan akses kamera untuk memindai QR Code buku.
        </Text>
        <TouchableOpacity
          style={[styles.buttonStarted, { backgroundColor: styles.color_list.green }]}
          onPress={requestPermission}
        >
          <Text style={[styles.buttonText, { color: styles.color_list.white }]}>
            Izinkan Kamera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: styles.color_list.black }}>
      <StatusBar barStyle="light-content" />

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={torch}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* Overlay gelap + frame pemindaian */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={s.overlayTop} />
        <View style={s.overlayMid}>
          <View style={s.overlaySide} />
          <View style={s.frame}>
            <View style={[s.corner, s.cornerTL]} />
            <View style={[s.corner, s.cornerTR]} />
            <View style={[s.corner, s.cornerBL]} />
            <View style={[s.corner, s.cornerBR]} />
          </View>
          <View style={s.overlaySide} />
        </View>
        <View style={s.overlayBottom} />
      </View>

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          style={[styles.btn_icon, styles.shadow]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={styles.color_list.black} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Pindai QR Buku</Text>
        <TouchableOpacity
          style={[styles.btn_icon, styles.shadow]}
          onPress={() => setTorch((t) => !t)}
        >
          <Ionicons
            name={torch ? "flash" : "flash-off"}
            size={20}
            color={styles.color_list.black}
          />
        </TouchableOpacity>
      </View>

      {!scanned && (
        <Text style={s.hint}>Arahkan kamera ke QR Code pada sampul buku</Text>
      )}

      {/* Hasil scan */}
      {scanned && (
        <View style={s.resultCard}>
          {loading && (
            <View style={s.center}>
              <ActivityIndicator color={styles.color_list.green} size="large" />
              <Text style={{ marginTop: 10, color: "gray" }}>Mencari data buku...</Text>
            </View>
          )}

          {!loading && errorMsg && (
            <View style={s.center}>
              <Ionicons name="alert-circle-outline" size={36} color={styles.color_list.orange} />
              <Text style={{ marginTop: 8, textAlign: "center", color: styles.color_list.black }}>
                {errorMsg}
              </Text>
              <TouchableOpacity
                style={[styles.buttonStarted, { backgroundColor: styles.color_list.green, marginTop: 16 }]}
                onPress={resetScan}
              >
                <Text style={[styles.buttonText, { color: styles.color_list.white }]}>Coba Lagi</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && book && (
            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: book.cover }} style={s.bookCover} />
              <View style={{ flex: 1, marginLeft: 14, justifyContent: "center" }}>
                <Text style={styles.book_card_title} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.book_card_author}>{book.author}</Text>
                <View style={styles.book_card_footer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="star" size={14} color={styles.color_list.orange} />
                    <Text style={styles.book_card_rating}>{book.rating}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="eye-outline" size={14} color={styles.color_list.gray} />
                    <Text style={styles.book_card_views}>{book.views}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
                  <TouchableOpacity
                    style={[s.smallBtn, { backgroundColor: styles.color_list.green }]}
                    onPress={goToDetail}
                  >
                    <Text style={s.smallBtnText}>Lihat Detail</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.smallBtn, { backgroundColor: styles.color_list.green_light }]}
                    onPress={resetScan}
                  >
                    <Text style={[s.smallBtnText, { color: styles.color_list.green }]}>
                      Scan Ulang
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: styles.color_list.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  hint: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    color: styles.color_list.white,
    fontSize: 13,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  overlayMid: {
    flexDirection: "row",
    height: FRAME_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
  },
  corner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: styles.color_list.orange,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 12,
  },
  resultCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: styles.color_list.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 160,
  },
  bookCover: {
    width: 90,
    height: 130,
    borderRadius: 8,
    backgroundColor: styles.color_list.green_dark,
  },
  smallBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  smallBtnText: {
    color: styles.color_list.white,
    fontWeight: "bold",
    fontSize: 13,
  },
});