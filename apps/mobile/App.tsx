import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { AdminDashboardScreen } from './src/screens/AdminDashboardScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PayoutScreen } from './src/screens/PayoutScreen';

export default function App() {
  const [screen, setScreen] = useState<'login' | 'dashboard' | 'session' | 'admin' | 'onboarding' | 'payout'>('dashboard');

  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        {screen === 'login' && <LoginScreen onContinue={() => setScreen('dashboard')} />}
        {screen === 'dashboard' && <DashboardScreen onOpenSession={() => setScreen('session')} onOpenAdmin={() => setScreen('admin')} />}
        {screen === 'session' && <SessionScreen onExit={() => setScreen('dashboard')} />}
        {screen === 'admin' && <AdminDashboardScreen onOpenPayout={() => setScreen('payout')} onBack={() => setScreen('dashboard')} />}
        {screen === 'onboarding' && <OnboardingScreen onStart={() => setScreen('dashboard')} />}
        {screen === 'payout' && <PayoutScreen onBack={() => setScreen('admin')} />}
      </View>
    </>
  );
}
