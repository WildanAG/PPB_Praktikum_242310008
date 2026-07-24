import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { styles } from "./styles/StyleApps";

const DEFAULT_AVATAR =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=default-user";

export default function Account() {
  const router = useRouter();

  // Data profil awal - gantikan dengan data dari API / context user asli
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [name, setName] = useState("Nama Pengguna");
  const [email, setEmail] = useState("user@email.com");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);

  // ---- Ganti avatar ----
  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Izin dibutuhkan",
        "Aplikasi memerlukan akses galeri untuk mengganti foto profil."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setUploadingAvatar(true);
      try {
        // TODO: upload result.assets[0].uri ke server / storage di sini
        // const uploadedUrl = await uploadAvatar(result.assets[0].uri);
        setAvatar(result.assets[0].uri);
      } catch (err) {
        Alert.alert("Gagal", "Tidak dapat mengunggah foto profil.");
      } finally {
        setUploadingAvatar(false);
      }
    }
  };

  // ---- Simpan perubahan profil ----
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Nama tidak boleh kosong");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Email tidak valid");
      return;
    }

    setSaving(true);
    try {
      // TODO: panggil API update profile di sini, misalnya:
      // await api.put('/profile', { name, email, phone, bio, avatar });
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulasi request
      Alert.alert("Berhasil", "Profil kamu telah diperbarui.");
    } catch (err) {
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan profil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.h_container}>
          <TouchableOpacity
            style={[styles.btn_icon, styles.shadow]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={styles.color_list.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Profil Saya</Text>
          <View style={{ width: 45 }} />
        </View>

        {/* Avatar */}
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <View style={{ width: 120, height: 120 }}>
            <Image
              source={{ uri: avatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: styles.color_list.green_light,
              }}
            />
            {uploadingAvatar && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: "rgba(0,0,0,0.35)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color={styles.color_list.white} />
              </View>
            )}
            <TouchableOpacity
              onPress={handlePickAvatar}
              style={[
                styles.circle_premium,
                { width: 36, height: 36, borderRadius: 18, top: undefined, bottom: -4, right: -4 },
              ]}
            >
              <Ionicons name="camera" size={18} color={styles.color_list.white} />
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: "bold", color: styles.color_list.black }}>
            {name}
          </Text>
          <Text style={{ color: styles.color_list.gray, fontSize: 13 }}>{email}</Text>
        </View>

        {/* Form */}
        <View style={{ marginTop: 10 }}>
          <FieldLabel text="Nama Lengkap" />
          <FieldInput value={name} onChangeText={setName} placeholder="Masukkan nama lengkap" />

          <FieldLabel text="Email" />
          <FieldInput
            value={email}
            onChangeText={setEmail}
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FieldLabel text="Nomor Telepon" />
          <FieldInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Masukkan nomor telepon"
            keyboardType="phone-pad"
          />

          <FieldLabel text="Bio" />
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Ceritakan sedikit tentang dirimu"
            placeholderTextColor="gray"
            multiline
            numberOfLines={4}
            style={{
              backgroundColor: styles.color_list.white,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "#00000015",
              paddingHorizontal: 15,
              paddingVertical: 12,
              fontSize: 14,
              color: styles.color_list.black,
              textAlignVertical: "top",
              minHeight: 90,
              marginBottom: 10,
            }}
          />
        </View>

        {/* Simpan */}
        <TouchableOpacity
          style={[
            styles.buttonStarted,
            {
              backgroundColor: styles.color_list.green,
              alignSelf: "center",
              marginTop: 20,
              opacity: saving ? 0.7 : 1,
            },
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color={styles.color_list.white} />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color={styles.color_list.white} />
              <Text style={[styles.buttonText, { color: styles.color_list.white }]}>
                Simpan Perubahan
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Label field kecil, konsisten dengan gaya sub_title di style.js
function FieldLabel({ text }) {
  return (
    <Text style={{ fontSize: 13, color: "gray", marginBottom: 6, marginTop: 12 }}>
      {text}
    </Text>
  );
}

// Input bergaya pill/rounded, senada dengan search bar pada gambar referensi
function FieldInput(props) {
  return (
    <TextInput
      placeholderTextColor="gray"
      style={{
        backgroundColor: styles.color_list.white,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#00000015",
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontSize: 14,
        color: styles.color_list.black,
      }}
      {...props}
    />
  );
}