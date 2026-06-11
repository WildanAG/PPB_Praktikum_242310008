import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CartItem from './CartItem';

const CartOrder = ({ 
  items = [],
  onAddDiscount,
  onAddNote,
  onCheckout 
}) => {
  const [cartItems, setCartItems] = useState(items);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.quantity);
  }, 0);

  const taxRate = 0.085; // 8.5%
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">Current Order</Text>
          <Text className="text-sm text-gray-500">
            {cartItems.length} ITEMS SELECTED
          </Text>
        </View>
      </View>

      {/* Cart Items */}
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              sku={item.sku}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))
        ) : (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-500">Your cart is empty</Text>
          </View>
        )}

        {/* Action Buttons */}
        {cartItems.length > 0 && (
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity 
              className="flex-1 flex-row items-center justify-center border border-red-500 rounded-lg py-3"
              onPress={onAddDiscount}
            >
              <MaterialIcons name="local-offer" size={18} color="red" />
              <Text className="ml-2 text-red-500 font-semibold">Add Discount</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-1 flex-row items-center justify-center border border-gray-400 rounded-lg py-3"
              onPress={onAddNote}
            >
              <MaterialIcons name="note" size={18} color="gray" />
              <Text className="ml-2 text-gray-700 font-semibold">Order Note</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Summary & Checkout */}
      {cartItems.length > 0 && (
        <View className="bg-white border-t border-gray-200 p-4 space-y-3">
          {/* Subtotal */}
          <View className="flex-row justify-between">
            <Text className="text-gray-600 text-sm">Subtotal</Text>
            <Text className="font-semibold">${subtotal.toFixed(2)}</Text>
          </View>

          {/* Tax */}
          <View className="flex-row justify-between pb-3 border-b border-gray-200">
            <Text className="text-gray-600 text-sm">Tax (8.5%)</Text>
            <Text className="font-semibold">${tax.toFixed(2)}</Text>
          </View>

          {/* Total */}
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 text-sm">Total Amount</Text>
            <Text className="text-2xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity 
            className="bg-blue-600 rounded-lg py-4 items-center mt-2"
            onPress={onCheckout}
          >
            <Text className="text-white text-lg font-bold">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartOrder;