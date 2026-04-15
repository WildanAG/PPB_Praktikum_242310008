import React from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Index = () => {

    const biodata = {
        nama: "Anton Sukamto",
        nim: "20200101",
        alamat: "bogor",
        email: "anton@gmail.com",
        nomor_telepon: "0856712283"
    }

    return (
        <View style={styles.container}> 
            <Image source={require("../../../assets/avatar/download.png")} style={styles.headers.img_avatar}/>            
            <Text>Nama: {biodata.nama}</Text>
            <Text>Nim: {biodata.nim}</Text>

            <View>
                <View>
                    <Text style={styles.identity.title}>Phone</Text>
                    <TextInput
                    value = {biodata.nomor_telepon}
                    style = {styles.identity.input_text}
                    autoFocus
                    />
                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.identity.title}>Email</Text>
                    <TextInput
                    value = {biodata.email}
                    style = {styles.identity.input_text}
                    autoFocus
                    />
                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.identity.title}>Alamat</Text>
                    <TextInput
                    value = {biodata.alamat}
                    style = {styles.identity.input_text}
                    autoFocus
                    />
                </View>
            </View>

            <View style={{marginTop: 15}}>
                <TouchableOpacity style={styles.identity.button}>
                    <Text style={styles.identity.button_text}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  headers: {
    title: {
      fontWeight: "bold",
      fontSize: 40,
    },
    subtitle: {
      fontWeight: "bold",
      fontSize: 20,
      color: "red",
    },
    img_avatar: {
      width: 80,
      height: 80,
      borderRadius: 100,
      borderColor: "black",
      borderWidth: 4,
      padding: 2,
      backgroundColor: "#f2f2f2",
    },
  },
  identity: {
    container: {
      alignSelf: "stretch",
      padding: 10,
      marginTop: 20,            
    },
    card_input: {
      borderWidth: 5,
      borderColor: "#9b9d9f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
    },
    title: {
      color: "#9b9d9f",
      fontSize: 16,
      marginBottom: 0,
    },
    input_text: {
      color: "#000",
      fontSize: 16,
      padding: 0,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0ea6d0",
      padding: 15,
      borderRadius: 10,
    },
    button_text: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
    },
  },
});

export default Index;
