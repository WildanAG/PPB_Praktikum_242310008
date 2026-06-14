import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { OrderContext } from '../../context/OrderContext';
import { FontAwesome } from '@expo/vector-icons';

export default function HistoryScreen() {
  const { orders } = useContext(OrderContext);
  const router = useRouter();

  const renderItem = ({ item }) => {
    const totalItems = item.items.reduce((sum, i) => sum + i.quantity, 0);
    const date = new Date(item.date).toLocaleDateString();

    return (
      <TouchableOpacity 
        className="bg-surface rounded-2xl mb-4 p-4 shadow-sm border border-gray-100"
        onPress={() => router.push(`/transaction/${item.id}`)}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-text font-bold text-base">{item.id}</Text>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-bold uppercase">{item.status}</Text>
          </View>
        </View>
        <Text className="text-muted text-sm mb-4">{date} • {totalItems} items</Text>
        <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
          <Text className="text-text font-bold">Total Payment</Text>
          <Text className="text-primary font-bold text-lg">${item.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <FontAwesome name="history" size={64} color="#D1D5DB" />
            <Text className="text-center mt-4 text-muted text-lg">No past orders found.</Text>
          </View>
        }
      />
    </View>
  );
}
