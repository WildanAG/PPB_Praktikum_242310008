import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const success = await login(username, password);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-background">
      <View className="mb-10 items-center">
        <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4 shadow-lg">
          <Text className="text-white text-4xl font-bold">🍔</Text>
        </View>
        <Text className="text-4xl font-extrabold text-primary mb-2">FoodApp</Text>
        <Text className="text-muted text-base">Sign in to your account</Text>
      </View>

      <View className="bg-surface p-6 rounded-3xl shadow-sm border border-gray-100">
        <Text className="text-text font-bold mb-2">Username</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-text"
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text className="text-text font-bold mb-2">Password</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6 text-text"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          className="bg-primary rounded-xl py-4 items-center mb-4 shadow-md active:bg-secondary"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-muted">Dont have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
