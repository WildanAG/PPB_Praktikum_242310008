import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import { FontAwesome } from '@expo/vector-icons';

export default function CheckoutScreen() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Cart is empty');
      return;
    }

    const order = {
      items: cart,
      total: getCartTotal() + 5.00, // including $5 delivery fee
      paymentMethod,
    };

    const newOrder = addOrder(order);
    clearCart();
    router.replace(`/order-summary/${newOrder.id}`);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Order Summary */}
        <View className="bg-surface rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <Text className="text-text font-bold text-lg mb-4">Order Summary</Text>
          {cart.map((item) => (
            <View key={item.id} className="flex-row justify-between mb-2">
              <Text className="text-muted flex-1 mr-2" numberOfLines={1}>{item.quantity}x {item.title}</Text>
              <Text className="text-text font-bold">${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View className="h-[1px] bg-gray-200 my-4" />
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted">Subtotal</Text>
            <Text className="text-text font-bold">${getCartTotal().toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-muted">Delivery Fee</Text>
            <Text className="text-text font-bold">$5.00</Text>
          </View>
          <View className="h-[1px] bg-gray-200 my-4" />
          <View className="flex-row justify-between items-center">
            <Text className="text-text font-bold text-lg">Total</Text>
            <Text className="text-primary font-bold text-2xl">${(getCartTotal() + 5.0).toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View className="bg-surface rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
          <Text className="text-text font-bold text-lg mb-4">Payment Method</Text>
          
          <TouchableOpacity 
            className={`flex-row items-center p-4 rounded-xl border ${paymentMethod === 'Credit Card' ? 'border-primary bg-orange-50' : 'border-gray-200 bg-gray-50'} mb-2`}
            onPress={() => setPaymentMethod('Credit Card')}
          >
            <FontAwesome name="credit-card" size={24} color={paymentMethod === 'Credit Card' ? '#FF4500' : '#9CA3AF'} />
            <Text className={`ml-4 font-bold ${paymentMethod === 'Credit Card' ? 'text-primary' : 'text-gray-600'}`}>Credit/Debit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className={`flex-row items-center p-4 rounded-xl border ${paymentMethod === 'Cash on Delivery' ? 'border-primary bg-orange-50' : 'border-gray-200 bg-gray-50'}`}
            onPress={() => setPaymentMethod('Cash on Delivery')}
          >
            <FontAwesome name="money" size={24} color={paymentMethod === 'Cash on Delivery' ? '#FF4500' : '#9CA3AF'} />
            <Text className={`ml-4 font-bold ${paymentMethod === 'Cash on Delivery' ? 'text-primary' : 'text-gray-600'}`}>Cash on Delivery</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="bg-surface p-6 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-100">
        <TouchableOpacity 
          className="bg-primary rounded-xl py-4 items-center shadow-md active:bg-secondary"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white font-bold text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
