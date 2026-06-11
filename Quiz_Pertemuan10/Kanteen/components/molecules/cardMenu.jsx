import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const CardMenu = () => {
    return (
        <ScrollView className="bg-orange-50">
            <View className="flex-row justify-around mt-4">
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/batagor.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Batagor</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 5.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/cilor.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Cilor</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 3.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View className="flex-row justify-around mt-4">
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/cimol.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Cimol</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 3.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/bubur.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Bubur</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 8.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View className="flex-row justify-around mt-4 mb-4">
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/esteh.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Es Teh</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 5.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="bg-white rounded-2xl p-4 shadow">
                    <Image
                        source={require('../../assets/image_card/thaiTea.png')}
                        style={{ width: 150, height: 150 }}
                        className="rounded-xl"
                    />
                    <View className="flex-row justify-between items-center mt-2">
                        <View>
                            <Text className="text-base font-semibold text-gray-700">Thai Tea</Text>
                            <Text className="text-sm text-orange-500 font-medium">Rp 8.000</Text>
                        </View>
                        <TouchableOpacity className="bg-orange-500 rounded-full w-7 h-7 items-center justify-center">
                            <Text className="text-black font-bold text-base">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            
        </ScrollView>
    );
}

export default CardMenu;