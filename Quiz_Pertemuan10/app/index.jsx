import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function Gateway() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [loading, user]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#FF4500" />
      <Text className="mt-4 text-primary font-bold text-lg">Loading FoodApp...</Text>
    </View>
  );
}
