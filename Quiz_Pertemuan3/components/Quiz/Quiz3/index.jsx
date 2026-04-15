import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Index = () => {

    const Wildan = {
        fullName: "Wildan Ahmad Gifari",
        NPM: 242310008,
        Kelas: "TI 24 PA",
        Umur: 20,        
    }

    const Doni = {
        fullName: "Doni Arifitranto",
        NPM: 100101,
        Kelas: "TI 24 PA",
        Umur: 20,
    }

    const Dava = {
        fullName: "Dava Iwani",
        NPM: 3232130,
        Kelas: "TI 24 PA",
        Umur: 20,
    }

    return (
        <View style={styles.container}>
            <View style={styles.card1}>
                <Image source={require("../../../assets/avatar/wildan.jpg")}style={styles.image1}/>
                <Text>Name: {Wildan.fullName}</Text>
                <Text>NPM: {Wildan.NPM}</Text>
                <Text>Kelas: {Wildan.Kelas}</Text>
                <Text>Umur: {Wildan.Umur}</Text>                
            </View>

            <View style={styles.card1}>
                <Image source={require("../../../assets/avatar/BatmanKW.jpeg")}style={styles.image1}/>
                <Text>Name: {Doni.fullName}</Text>
                <Text>NPM: {Doni.NPM}</Text>
                <Text>Kelas: {Doni.Kelas}</Text>
                <Text>Umur: {Doni.Umur}</Text>                
            </View>

            <View style={styles.card1}>
                <Image source={require("../../../assets/avatar/BaristaReal.jpeg")}style={styles.image1}/>
                <Text>Name: {Dava.fullName}</Text>
                <Text>NPM: {Dava.NPM}</Text>
                <Text>Kelas: {Dava.Kelas}</Text>
                <Text>Umur: {Dava.Umur}</Text>                
            </View>                                        
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card1: {        
        alignItems: 'center',
        width: 250,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        padding: 10,
        
    },

    image1: {
        width: 80,
        height: 80,
        borderRadius: 50,
    }
})

export default Index;
