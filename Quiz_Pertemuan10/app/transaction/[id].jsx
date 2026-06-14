import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { OrderContext } from '../../context/OrderContext';

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const { getOrderById } = useContext(OrderContext);

  const order = getOrderById(id);

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-text">Transaction not found.</Text>
      </View>
    );
  }

  const date = new Date(order.date).toLocaleString();

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-4">
      <View className="bg-surface rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
        <View className="items-center mb-6 pb-6 border-b border-gray-100">
          <Text className="text-muted mb-1">Total Amount</Text>
          <Text className="text-4xl font-extrabold text-primary">${order.total.toFixed(2)}</Text>
          <View className="bg-green-100 px-4 py-1 rounded-full mt-3">
            <Text className="text-green-700 font-bold uppercase">{order.status}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-text font-bold text-lg mb-4">Transaction Details</Text>
          <View className="flex-row justify-between mb-3">
            <Text className="text-muted">Transaction ID</Text>
            <Text className="text-text font-bold">{order.id}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-muted">Date & Time</Text>
            <Text className="text-text font-bold">{date}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-muted">Payment Method</Text>
            <Text className="text-text font-bold">{order.paymentMethod}</Text>
          </View>
        </View>

        <View>
          <Text className="text-text font-bold text-lg mb-4">Ordered Items</Text>
          {order.items.map((item, index) => (
            <View key={index} className="flex-row justify-between mb-3">
              <Text className="text-text flex-1 mr-2">{item.quantity}x {item.title}</Text>
              <Text className="text-text font-bold">${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View className="h-[1px] bg-gray-200 my-4" />
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted">Subtotal</Text>
            <Text className="text-text font-bold">${(order.total - 5).toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-muted">Delivery Fee</Text>
            <Text className="text-text font-bold">$5.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
