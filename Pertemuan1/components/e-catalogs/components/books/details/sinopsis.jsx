import Feather from "@expo/vector-icons/Feather";
import * as Speech from "expo-speech";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color_list } from "../../../styles/StyleApps";

// expo-speech memakai TTS engine bawaan OS dan otomatis keluar lewat speaker
// device — TIDAK memerlukan permintaan izin akses perangkat apapun.

// Memecah teks jadi token kata & spasi lengkap dengan indeks awal-akhirnya
// pada teks utuh, supaya highlight bisa dipetakan balik dari charIndex yang
// dikembalikan expo-speech lewat onBoundary.
function tokenizeWithOffsets(text) {
  if (!text) return [];
  const tokens = text.split(/(\s+)/); // pisah tapi tetap simpan whitespace
  let cursor = 0;
  return tokens
    .filter((t) => t.length > 0)
    .map((t) => {
      const start = cursor;
      cursor += t.length;
      return { text: t, start, end: cursor, isWord: t.trim().length > 0 };
    });
}

export default function Sinopsis({ book }) {
  const [playerStatus, setPlayerStatus] = useState("idle"); // idle | playing | paused
  const [currentTokenIdx, setCurrentTokenIdx] = useState(-1);

  // offset karakter tempat bacaan terakhir berhenti (dipakai untuk resume)
  const resumeOffsetRef = useRef(0);

  const tokens = useMemo(
    () => tokenizeWithOffsets(book?.sinopsis),
    [book?.sinopsis]
  );

  // Hentikan TTS saat komponen unmount / berpindah buku
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  // Reset player kalau buku yang ditampilkan berganti
  useEffect(() => {
    Speech.stop();
    setPlayerStatus("idle");
    setCurrentTokenIdx(-1);
    resumeOffsetRef.current = 0;
  }, [book?.id]);

  const highlightTokenAtGlobalIndex = useCallback(
    (globalIndex) => {
      const idx = tokens.findIndex(
        (t) => t.isWord && globalIndex >= t.start && globalIndex < t.end
      );
      if (idx !== -1) setCurrentTokenIdx(idx);
    },
    [tokens]
  );

  const speakFrom = useCallback(
    (offset) => {
      if (!book?.sinopsis) return;
      const textToSpeak = book.sinopsis.slice(offset);

      Speech.speak(textToSpeak, {
        language: book?.language || "en-US",
        onStart: () => setPlayerStatus("playing"),
        onBoundary: (event) => {
          // charIndex relatif terhadap textToSpeak, ditambah offset supaya
          // sesuai posisi pada teks sinopsis yang utuh
          const globalIndex = offset + event.charIndex;
          resumeOffsetRef.current = globalIndex;
          highlightTokenAtGlobalIndex(globalIndex);
        },
        onDone: () => {
          setPlayerStatus("idle");
          setCurrentTokenIdx(-1);
          resumeOffsetRef.current = 0;
        },
        onError: () => {
          setPlayerStatus("idle");
        },
      });
    },
    [book?.sinopsis, book?.language, highlightTokenAtGlobalIndex]
  );

  // ---- Play ----
  // Kalau statusnya "paused", lanjutkan dari kata terakhir yang dibacakan.
  // Kalau tidak, mulai dari awal.
  const handlePlay = () => {
    if (playerStatus === "paused") {
      speakFrom(resumeOffsetRef.current);
    } else {
      resumeOffsetRef.current = 0;
      setCurrentTokenIdx(-1);
      speakFrom(0);
    }
  };

  // ---- Pause ----
  // Speech.pause()/resume() bawaan expo-speech tidak konsisten didukung di
  // semua platform (khususnya Android), jadi dipakai pendekatan yang lebih
  // andal: stop lalu simpan posisi karakter terakhir untuk dilanjutkan.
  const handlePause = () => {
    Speech.stop();
    setPlayerStatus("paused");
  };

  // ---- Stop ----
  const handleStop = () => {
    Speech.stop();
    setPlayerStatus("idle");
    setCurrentTokenIdx(-1);
    resumeOffsetRef.current = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_row}>
        <Text style={styles.title}>sinopsis</Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleStop}
            disabled={playerStatus === "idle"}
            style={[styles.icon_btn, { opacity: playerStatus === "idle" ? 0.4 : 1 }]}
          >
            <Feather name="square" size={16} color={color_list.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={playerStatus === "playing" ? handlePause : handlePlay}
            style={[styles.icon_btn, styles.icon_btn_primary]}
          >
            <Feather
              name={playerStatus === "playing" ? "pause" : "play"}
              size={16}
              color={color_list.green}
            />
          </TouchableOpacity>
        </View>
      </View>

      {playerStatus !== "idle" && (
        <Text style={styles.status_text}>
          {playerStatus === "playing" ? "Sedang membacakan audiobook..." : "Dijeda"}
        </Text>
      )}

      <Text style={styles.paragraph}>
        {tokens.map((token, idx) =>
          token.isWord ? (
            <Text
              key={idx}
              style={
                idx === currentTokenIdx
                  ? styles.word_highlight
                  : styles.word_default
              }
            >
              {token.text}
            </Text>
          ) : (
            <Text key={idx} style={styles.word_default}>
              {token.text}
            </Text>
          )
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    color: color_list.white,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "left",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon_btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff25",
    justifyContent: "center",
    alignItems: "center",
  },
  icon_btn_primary: {
    backgroundColor: color_list.white,
  },
  status_text: {
    color: color_list.orange,
    fontSize: 12,
    marginBottom: 8,
  },
  paragraph: {
    color: color_list.cream,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "justify",
  },
  word_default: {
    color: color_list.cream,
  },
  word_highlight: {
    color: color_list.green,
    backgroundColor: color_list.orange,
    fontWeight: "bold",
    borderRadius: 3,
  },
});