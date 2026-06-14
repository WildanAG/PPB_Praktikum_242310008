import React, { useContext, useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

const InitialLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'menu' || segments[0] === 'checkout' || segments[0] === 'order-summary' || segments[0] === 'transaction';
    
    if (!user && inAuthGroup) {
      router.replace('/login');
    } else if (user && (!segments[0] || segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'index')) {
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="menu/[id]" options={{ title: 'Menu Detail', presentation: 'modal' }} />
      <Stack.Screen name="checkout" options={{ title: 'Checkout', headerStyle: { backgroundColor: '#FF4500' }, headerTintColor: '#fff' }} />
      <Stack.Screen name="order-summary/[id]" options={{ title: 'Order Summary', headerShown: false }} />
      <Stack.Screen name="transaction/[id]" options={{ title: 'Transaction Detail', headerStyle: { backgroundColor: '#FF4500' }, headerTintColor: '#fff' }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <InitialLayout />
          <StatusBar style="auto" />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
