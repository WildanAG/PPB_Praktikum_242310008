import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import index from '../latihan1';

const Index = () => {

    //data diri
    const dataDiri = {
        nama: "Wildan Ahmad Gifari",
        beratBadan: 55,
        tinggiBadan: 170,
    };

    //porsi makan harian
    const porsiMakan = [
        {waktuMakan: "Sarapan", kalori: 50},
        {waktuMakan: "Makan Siang", kalori: 120},
        {waktuMakan: "Makan Malam", kalori: 100},
    ];

    //perulangan total kalori
    let totalKalori = 0;
    for (let i = 0; i < porsiMakan.length; i++) {
        totalKalori += porsiMakan[i].kalori;
    }

    //konversi tinggi badan
    let konversiTinggi = dataDiri.tinggiBadan / 100;

    //Body Mass Index
    let bmi = dataDiri.beratBadan / (konversiTinggi * konversiTinggi);

    //status BMI
    let statusbmi = "";
    if (bmi < 18) {
        statusbmi = "Kurus";
    } else if (bmi > 18 && bmi < 24) {
        statusbmi = "Ideal";
    } else {
        statusbmi = "Berlebih";
    }

    //kebutuhan Kalori
    const kebutuhanKalori = dataDiri.beratBadan * 30;
    let kategoriKalori = "";
    if (totalKalori < kebutuhanKalori * 0.9) {
        kategoriKalori = "Kurang";
    } else if (totalKalori <= kebutuhanKalori * 1.1) {
        kategoriKalori = "Tercukupi";
    } else {
        kategoriKalori = "Berlebih";
    }

    //logika kesimpulan
    let kesimpulan = ""
    if (statusbmi == "Kurus" && kategoriKalori == "Kurang") {
        kesimpulan = "Berat badan sudah ideal dan asupan kalori sudah sesuai"
    } else {
        kesimpulan = "Berat badan belum ideal dan asupan kalori belum sesuai"
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Evaluasi Berat Badan Total</Text>
            <Text style={styles.pasien}>Pasien</Text>
            <Text>Nama : {dataDiri.nama}</Text>
            <Text>Berat Badan : {dataDiri.beratBadan} Kg</Text>
            <Text>Tinggi Badan : {dataDiri.tinggiBadan} cm</Text>

            <Text style={styles.porsi}>Porsi Makanan Harian</Text>
            {porsiMakan.map((item, index) => (
                <View key={index}>
                    <Text>{item.waktuMakan} - {item.kalori} kkal</Text>
                </View>
            ))}
            <Text>Total Kalori: {totalKalori} kkal</Text>

            <Text style={styles.perhitungan}>Hasil Perhitungan</Text>
            <Text>BMI: {bmi.toFixed(2)} </Text>
            <Text>Status BMI: {statusbmi} </Text>
            <Text>Status Kalori: {kategoriKalori} </Text>

            <Text style={styles.kesimpulan}>{kesimpulan}</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        textAlign: 'left',
    },

    Title: {
        marginTop: 18,
        fontWeight: 'bold',
        fontSize: 24,
    },

    pasien: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },

    porsi: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },

    perhitungan: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },

    kesimpulan: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
    }    
});

export default Index;