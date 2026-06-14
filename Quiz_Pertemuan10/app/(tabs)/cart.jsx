import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CartContext } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View className="bg-surface rounded-2xl mb-4 p-4 shadow-sm border border-gray-100 flex-row items-center">
      <View className="w-20 h-20 bg-white p-1 rounded-xl">
        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
      </View>
      <View className="flex-1 ml-4 justify-between h-20">
        <View>
          <Text className="text-text font-bold text-sm" numberOfLines={2}>{item.title}</Text>
          <Text className="text-primary font-bold mt-1">${item.price.toFixed(2)}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center bg-gray-100 rounded-lg">
            <TouchableOpacity 
              className="px-3 py-1"
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text className="text-lg font-bold text-text">-</Text>
            </TouchableOpacity>
            <Text className="px-2 font-bold text-text">{item.quantity}</Text>
            <TouchableOpacity 
              className="px-3 py-1"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Text className="text-lg font-bold text-text">+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <FontAwesome name="trash" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <FontAwesome name="shopping-basket" size={64} color="#D1D5DB" />
            <Text className="text-center mt-4 text-muted text-lg">Your cart is empty.</Text>
            <TouchableOpacity 
              className="mt-6 bg-primary px-6 py-3 rounded-full"
              onPress={() => router.push('/(tabs)')}
            >
              <Text className="text-white font-bold">Browse Menu</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {cart.length > 0 && (
        <View className="bg-surface p-6 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] -mx-4 border-t border-gray-100">
          <View className="flex-row justify-between mb-4">
            <Text className="text-text font-bold text-lg">Total Amount</Text>
            <Text className="text-primary font-bold text-2xl">${getCartTotal().toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            className="bg-primary rounded-xl py-4 items-center shadow-md active:bg-secondary"
            onPress={() => router.push('/checkout')}
          >
            <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
