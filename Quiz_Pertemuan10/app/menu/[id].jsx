import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchProductById } from '../../services/api';
import { CartContext } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';

export default function MenuDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      router.back();
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-text">Product not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="bg-white p-6 items-center shadow-sm rounded-b-[40px] mb-6">
          <Image source={{ uri: product.image }} className="w-64 h-64" resizeMode="contain" />
        </View>
        <View className="px-6">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-extrabold text-text flex-1 mr-4">{product.title}</Text>
            <Text className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</Text>
          </View>
          <View className="flex-row items-center mb-6">
            <View className="bg-orange-100 px-3 py-1 rounded-full mr-2">
              <Text className="text-primary text-xs font-bold capitalize">{product.category}</Text>
            </View>
            <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
              <FontAwesome name="star" size={12} color="#FBBF24" />
              <Text className="text-xs font-bold text-gray-700 ml-1">{product.rating?.rate} ({product.rating?.count})</Text>
            </View>
          </View>
          
          <Text className="text-text font-bold text-lg mb-2">Description</Text>
          <Text className="text-muted leading-6 mb-8">{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="bg-surface p-6 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-100 flex-row items-center">
        <View className="flex-row items-center bg-gray-100 rounded-xl mr-4 px-2 py-1">
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center bg-white rounded-lg shadow-sm"
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text className="text-xl font-bold text-text">-</Text>
          </TouchableOpacity>
          <Text className="w-10 text-center font-bold text-lg text-text">{quantity}</Text>
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center bg-white rounded-lg shadow-sm"
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text className="text-xl font-bold text-text">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          className="flex-1 bg-primary rounded-xl py-4 items-center shadow-md active:bg-secondary flex-row justify-center"
          onPress={handleAddToCart}
        >
          <FontAwesome name="shopping-cart" size={20} color="#fff" />
          <Text className="text-white font-bold text-lg ml-2">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
