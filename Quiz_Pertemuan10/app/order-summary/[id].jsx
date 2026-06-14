import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { OrderContext } from '../../context/OrderContext';

export default function OrderSummary() {
  const { id } = useLocalSearchParams();
  const { getOrderById } = useContext(OrderContext);
  const router = useRouter();

  const order = getOrderById(id);

  if (!order) return null;

  return (
    <View className="flex-1 bg-primary justify-center px-6">
      <View className="bg-white rounded-3xl p-8 items-center shadow-xl">
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
          <FontAwesome name="check" size={40} color="#10B981" />
        </View>
        <Text className="text-3xl font-extrabold text-text mb-2 text-center">Order Placed!</Text>
        <Text className="text-muted text-center mb-8">
          Your order has been successfully placed and is being prepared.
        </Text>

        <View className="w-full bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted">Order ID</Text>
            <Text className="text-text font-bold">{order.id}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted">Total Paid</Text>
            <Text className="text-primary font-bold">${order.total.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-muted">Payment Method</Text>
            <Text className="text-text font-bold">{order.paymentMethod}</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-primary rounded-xl py-4 items-center mb-3 shadow-md active:bg-secondary"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-white font-bold text-lg">Back to Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-full bg-gray-100 rounded-xl py-4 items-center"
          onPress={() => router.replace(`/transaction/${order.id}`)}
        >
          <Text className="text-text font-bold text-lg">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
