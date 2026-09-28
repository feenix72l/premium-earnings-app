import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { fetchBtcPrice } from '../lib/api';

export function OnboardingScreen({ onStart }: { onStart?: () => void }) {
  const [btcPrice, setBtcPrice] = useState(64800);

  useEffect(() => {
    const loadBtc = async () => {
      const btc = await fetchBtcPrice();
      if (btc) setBtcPrice(btc.usd);
    };
    loadBtc();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#111617', '#090909']} style={styles.hero}>
        <Text style={styles.kicker}>GoldMine</Text>
        <Text style={styles.title}>Build your earnings engine</Text>
        <Text style={styles.subtitle}>Track worker sessions, calculate payouts, and convert profits into BTC.</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Features</Text>
        {[
          'Live worker timer and session tracking',
          'Real-time USD and BTC conversion',
          'Admin oversight and payout management',
          `Current BTC rate: $${btcPrice.toLocaleString()}`,
          'Premium analytics dashboard',
        ].map((item) => (
          <View key={item} style={styles.itemRow}>
            <View style={styles.dot} />
            <Text style={styles.item}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Start dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: theme.colors.background },
  hero: { borderRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.18)' },
  kicker: { color: theme.colors.gold, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  title: { color: theme.colors.text, fontSize: 34, fontWeight: '800', marginTop: 16 },
  subtitle: { color: theme.colors.muted, fontSize: 16, marginTop: 12, lineHeight: 24 },
  card: { backgroundColor: theme.colors.panel, borderRadius: 24, padding: 18, marginTop: 20, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.12)' },
  cardTitle: { color: theme.colors.text, fontSize: 22, fontWeight: '700', marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: theme.colors.gold, marginRight: 12 },
  item: { color: theme.colors.text, fontSize: 15, flexShrink: 1 },
  button: { backgroundColor: theme.colors.gold, borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginTop: 22 },
  buttonText: { color: '#101010', fontWeight: '800', fontSize: 16 },
});
