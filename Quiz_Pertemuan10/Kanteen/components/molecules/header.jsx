import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Header = () => {
    return (
        <View className="bg-pink-500 px-5 pt-10 pb-6 rounded-b-[32px] shadow-lg">
            <View className="mb-4">
                <Text className="text-white text-3xl font-extrabold tracking-tight">
                    Kanteen
                </Text>
                <Text className="text-pink-100 text-sm mt-1">
                    Mau jajan apa hari ini?
                </Text>
            </View>

            <View className="bg-white rounded-3xl flex-row items-center px-4 py-3 shadow-sm" style={{ elevation: 2 }}>
                <Text className="text-gray-400 text-xl mr-3">🔍</Text>
                <TextInput
                    className="flex-1 text-base text-gray-800"
                    placeholder="Cari batagor, cilor, es teh..."
                    placeholderTextColor="#9ca3af"
                    returnKeyType="search"
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
    );
}

export default Header;