import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password || !name) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const success = await register(username, password, name);
    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 bg-background">
      <View className="mb-10 items-center mt-10">
        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4 shadow-lg">
          <Text className="text-white text-3xl font-bold">🍟</Text>
        </View>
        <Text className="text-4xl font-extrabold text-primary mb-2">Create Account</Text>
        <Text className="text-muted text-base">Join FoodApp today!</Text>
      </View>

      <View className="bg-surface p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
        <Text className="text-text font-bold mb-2">Full Name</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-text"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-text font-bold mb-2">Username</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-text"
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text className="text-text font-bold mb-2">Password</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6 text-text"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          className="bg-primary rounded-xl py-4 items-center mb-4 shadow-md active:bg-secondary"
          onPress={handleRegister}
        >
          <Text className="text-white font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-muted">Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-bold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
