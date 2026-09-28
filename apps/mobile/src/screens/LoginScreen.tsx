import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { loginWorker } from '../lib/api';

export function LoginScreen({ onContinue }: { onContinue?: () => void }) {
  const [email, setEmail] = useState('ava@goldmine.io');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const result = await loginWorker(email, 'password');
    setLoading(false);
    if (result?.success) {
      onContinue?.();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient colors={['#111617', '#090909']} style={styles.hero}>
          <Text style={styles.kicker}>GoldMine</Text>
          <Text style={styles.title}>Worker login</Text>
          <Text style={styles.subtitle}>Access your earnings dashboard</Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>{email}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>Demo: ava@goldmine.io or any worker email</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  hero: { borderRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.18)', marginBottom: 24 },
  kicker: { color: theme.colors.gold, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  title: { color: theme.colors.text, fontSize: 36, fontWeight: '800', marginTop: 12 },
  subtitle: { color: theme.colors.muted, fontSize: 16, marginTop: 10, lineHeight: 24 },
  card: { backgroundColor: theme.colors.panel, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.12)' },
  label: { color: theme.colors.text, fontSize: 14, fontWeight: '700', marginBottom: 8 },
  inputWrapper: { backgroundColor: '#101415', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.12)', paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 },
  inputText: { color: theme.colors.text, fontSize: 16 },
  button: { backgroundColor: theme.colors.gold, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#101010', fontWeight: '800', fontSize: 16 },
  hint: { color: theme.colors.muted, fontSize: 12, textAlign: 'center' },
});
