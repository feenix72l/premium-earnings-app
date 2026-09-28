import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { fetchDashboard, fetchBtcPrice } from '../lib/api';

export function PayoutScreen({ onBack }: { onBack?: () => void }) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [btcPrice, setBtcPrice] = useState(64800);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dash = await fetchDashboard();
      const btc = await fetchBtcPrice();
      if (dash) setDashboard(dash);
      if (btc) setBtcPrice(btc.usd);
      setLoading(false);
    };
    loadData();
  }, []);

  const payouts = [
    { label: 'Pending payouts', value: dashboard?.pendingPayouts || '$0' },
    { label: 'Bitcoin reserve', value: `${(dashboard?.totalBtc || 0)} BTC` },
    { label: 'Current BTC rate', value: `$${btcPrice.toLocaleString()}` },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payouts & Reserves</Text>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {payouts.map((item) => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.label}>Earnings breakdown</Text>
        <View style={styles.breakdown}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total USD earned</Text>
            <Text style={styles.breakdownValue}>${dashboard?.totalEarnings || '0'}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total BTC held</Text>
            <Text style={styles.breakdownValue}>{dashboard?.totalBtc || '0'} BTC</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Active workers</Text>
            <Text style={styles.breakdownValue}>{dashboard?.activeWorkers || 0}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: theme.colors.background, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: '800' },
  backButton: { backgroundColor: '#1d2325', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  backButtonText: { color: theme.colors.gold, fontWeight: '700' },
  card: { backgroundColor: theme.colors.panel, borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(246, 199, 106, 0.12)' },
  label: { color: theme.colors.muted, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2 },
  value: { color: theme.colors.text, fontSize: 24, fontWeight: '800', marginTop: 8 },
  breakdown: { marginTop: 12 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  breakdownLabel: { color: theme.colors.muted, fontSize: 13 },
  breakdownValue: { color: theme.colors.gold, fontWeight: '700' },
});
