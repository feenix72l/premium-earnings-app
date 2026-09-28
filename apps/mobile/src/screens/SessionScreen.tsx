import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

export function SessionScreen() {
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(3 * 60 * 60 + 14 * 60 + 28);
  const hourlyRate = 28;

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const earnings = useMemo(() => (seconds / 3600) * hourlyRate, [seconds, hourlyRate]);
  const btcEquivalent = useMemo(() => (earnings / 64800).toFixed(4), [earnings]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient colors={['#111617', '#0a0c0d', '#111617']} style={styles.card}>
          <Text style={styles.kicker}>Active Session</Text>
          <Text style={styles.title}>Ava Stone</Text>
          <Text style={styles.time}>{formatTime(seconds)}</Text>

          <View style={styles.metricRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>USD</Text>
              <Text style={styles.metricValue}>${earnings.toFixed(2)}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>BTC</Text>
              <Text style={styles.metricValue}>{btcEquivalent} BTC</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, running ? styles.stopStyle : styles.startStyle]}
            onPress={() => setRunning((prev) => !prev)}
          >
            <Text style={styles.buttonText}>{running ? 'Stop work' : 'Start work'}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Session analytics</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hourly rate</Text>
            <Text style={styles.infoValue}>${hourlyRate}/hr</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target reach</Text>
            <Text style={styles.infoValue}>86%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Next payout</Text>
            <Text style={styles.infoValue}>$1,240</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(246, 199, 106, 0.16)',
    marginBottom: 20,
  },
  kicker: {
    color: theme.colors.gold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
  },
  time: {
    color: theme.colors.text,
    fontSize: 38,
    fontWeight: '800',
    marginTop: 14,
    letterSpacing: 2,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 18,
  },
  metricBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(246, 199, 106, 0.12)',
  },
  metricLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
  },
  stopStyle: {
    backgroundColor: '#2a1c14',
    borderColor: 'rgba(246, 199, 106, 0.25)',
  },
  startStyle: {
    backgroundColor: '#1d3229',
    borderColor: 'rgba(56, 211, 159, 0.25)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  panel: {
    backgroundColor: theme.colors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
  },
  panelTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
});
