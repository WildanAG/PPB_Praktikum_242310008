import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary pt-10 pb-20 px-6 items-center rounded-b-[40px] shadow-lg">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-md">
          <Text className="text-primary text-4xl font-bold">{user.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text className="text-white text-2xl font-bold">{user.name}</Text>
        <Text className="text-white/80 text-sm mt-1">{user.email}</Text>
      </View>

      <View className="px-4 mt-[-40px]">
        <View className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-4">
          <View className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
              <FontAwesome name="user" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-muted text-xs">Username</Text>
              <Text className="text-text font-bold text-base">{user.username}</Text>
            </View>
          </View>

          <View className="flex-row items-center py-4 border-b border-gray-100">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
              <FontAwesome name="envelope" size={16} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-muted text-xs">Email</Text>
              <Text className="text-text font-bold text-base">{user.email}</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="flex-row items-center py-4 mt-2"
            onPress={logout}
          >
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
              <FontAwesome name="sign-out" size={20} color="#EF4444" />
            </View>
            <Text className="text-red-500 font-bold text-base">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
