import React from 'react';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';
import CardMenu from '../molecules/cardMenu';
import { SafeAreaView, View } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView className="flex-1 bg-orange-50">
            <View className="flex-1">
                <Header />
                <CardMenu />
                <Navbar />            
            </View>            
        </SafeAreaView>
    );
}

export default Home;
