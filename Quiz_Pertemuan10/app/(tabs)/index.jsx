import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchProducts } from '../../services/api';

export default function MenuCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((item) => item.category))];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-surface rounded-2xl mb-4 overflow-hidden shadow-sm border border-gray-100 flex-row"
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <View className="w-32 h-32 bg-white p-2">
        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="contain" />
      </View>
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="text-text font-bold text-base" numberOfLines={2}>{item.title}</Text>
          <Text className="text-muted text-xs capitalize mt-1">{item.category}</Text>
        </View>
        <Text className="text-primary font-bold text-lg mt-2">${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      {/* Search Bar */}
      <View className="flex-row items-center bg-surface rounded-xl px-4 py-2 mb-4 border border-gray-200 shadow-sm">
        <TextInput
          className="flex-1 text-text h-10"
          placeholder="Search for food..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category Filters */}
      <View className="mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 rounded-full mr-2 ${selectedCategory === item ? 'bg-primary' : 'bg-gray-200'}`}
              onPress={() => setSelectedCategory(item)}
            >
              <Text className={`font-bold capitalize ${selectedCategory === item ? 'text-white' : 'text-gray-600'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Product List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF4500" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text className="text-center mt-10 text-muted">No items found.</Text>
          }
        />
      )}
    </View>
  );
}
