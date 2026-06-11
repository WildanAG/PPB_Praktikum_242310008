import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CartItem = ({
    id,
    name,
    sku,
    price,
    qty,
    image,
    onQuantityChange,
    onRemove,
}) => {
    return (

        <View className="flex-row items-center p-4 border-b bg-white border-gray-200 rounded">
            {/* Isi komponen kamu di sini */}
            <Image 
                w
                source={{ uri: image }}
                className="w-20 h-20 rounded-lg bg-gray-200"
            />
            <View>
                <Text className="text-lg font-bold">{name}</Text>
                <Text className="text-gray-500">{sku}</Text>
                <Text className="text-gray-500">Rp {price}</Text>
            </View>
            <View className="flex-row items-center mt-2" >
                <TouchableOpacity
                    onPress={() => onQuantityChange(id, qty - 1)}
                    className="bg-gray-300 px-2 py-1 rounded"
                >
                    <FaMinus />
                </TouchableOpacity>
                <Text className="px-2 font-semibold">{qty}</Text>
                <TouchableOpacity
                    onPress={() => onQuantityChange(id, qty + 1)}
                    className="bg-gray-300 px-2 py-1 rounded"
                >
                    <FaPlus />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => onRemove(id)}
                className="bg-red-500 px-2 py-1 rounded ml-2"
            >
                <Text className="text-white">Remove</Text>
            </TouchableOpacity>

        </View>
    );
};


export default CartItem;
