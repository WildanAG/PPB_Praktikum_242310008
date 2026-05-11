import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

const Index = () => {
  const [name, setName] = useState("Anton Sukamto");
  const [nim, setNim] = useState("20200101");
  const [alamat, setAlamat] = useState("bogor");
  const [email, setEmail] = useState("anton@gmail.com");
  const [nomor, setNomor] = useState("0856712283");
  const [umur, setUmur] = useState("35");

  return (
    <ImageBackground
      source={require("../../../assets/avatar/image.png")}
      style={ui.ImageBackground}
    >
      <ScrollView
        style={ui.screen}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View style={ui.container}>
          <View style={ui.headerSection}>
            <Image
              source={require("../../../assets/avatar/download.png")}
              style={ui.avatar}
            />
            <Text style={ui.mainName}>{name}</Text>                     
            <Text style={ui.mainNim}>{nim}</Text>
            <Text style={ui.mainNim}>{alamat}</Text>
            <Text style={ui.mainNim}>{email}</Text>
            <Text style={ui.mainNim}>{nomor}</Text>
            <Text style={ui.mainNim}>{umur}</Text>            
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>Name</Text>
            <TextInput value={name} onChangeText={(Text) => setName(Text)} style={ui.input} />
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>NIM</Text>
            <TextInput value={nim} onChangeText={(Text) => setNim(Text)} style={ui.input} />
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>Email</Text>
            <TextInput value={email} onChangeText={(Text) => setEmail(Text)} style={ui.input} />
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>Nomor</Text>
            <TextInput value={nomor} onChangeText={(Text) => setNomor(Text)} style={ui.input} />
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>Alamat</Text>
            <TextInput value={alamat} onChangeText={(Text) => setAlamat(Text)} style={ui.input} />
          </View>

          <View style={ui.inputGroup}>
            <Text style={ui.label}>Umur</Text>
            <TextInput value={umur} onChangeText={(Text) => setUmur(Text)} style={ui.input} />
          </View>    

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={ui.buttonPrimary}>
              <Text style={ui.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Styling dibuat FLAT agar tidak "shit" dan mudah dibaca
const ui = {
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  screen: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#0ea6d0",
    marginBottom: 10,
  },
  mainName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  mainNim: {
    fontSize: 16,
    color: "#777",
  },
  inputGroup: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  label: {
    color: "#9b9d9f",
    fontSize: 13,
    marginBottom: 2,
  },
  input: {
    color: "#000",
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonPrimary: {
    alignItems: "center",
    backgroundColor: "#0ea6d0",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
};

export default Index;
