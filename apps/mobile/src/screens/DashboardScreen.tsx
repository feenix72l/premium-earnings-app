import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { activityFeed, quickStats, revenueSummary, workerStats } from '../data/mockData';
import { theme } from '../theme';

export function DashboardScreen() {
  const [running, setRunning] = React.useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#0d1111', '#090909', '#0d1111']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.kicker}>GoldMine</Text>
              <Text style={styles.headerTitle}>Worker Earnings</Text>
            </View>
            <View style={styles.balanceChip}>
              <Text style={styles.balanceLabel}>USD</Text>
              <Text style={styles.balanceValue}>$12.8k</Text>
            </View>
          </View>

          <View style={styles.mainCard}>
            <Text style={styles.mainLabel}>Current balance</Text>
            <Text style={styles.mainValue}>$4,260.62</Text>
            <Text style={styles.mainSubvalue}>≈ 0.081 BTC</Text>

            <TouchableOpacity
              style={[styles.startButton, running ? styles.stopButton : styles.startButtonActive]}
              onPress={() => setRunning(!running)}
            >
              <Text style={styles.buttonText}>{running ? 'Stop session' : 'Start session'}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          {quickStats.map((item) => (
            <View key={item.label} style={styles.statBox}>
              <Text style={[styles.statLabel, { color: item.accent }]}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top earners</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>

        {workerStats.map((worker) => (
          <View key={worker.name} style={styles.workerCard}>
            <View style={styles.workerRow}>
              <View>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.workerMeta}>${worker.ratePerHour}/hr</Text>
              </View>
              <View style={[styles.indicator, worker.active ? styles.indicatorActive : styles.indicatorIdle]} />
            </View>

            <View style={styles.workerMetricRow}>
              <Text style={styles.metricText}>Earned</Text>
              <Text style={styles.metricValue}>${worker.currentEarnings}</Text>
            </View>
            <View style={styles.workerMetricRow}>
              <Text style={styles.metricText}>BTC</Text>
              <Text style={styles.metricValue}>{worker.btcValue.toFixed(4)} BTC</Text>
            </View>

            <View style={styles.progressWrap}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${worker.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{worker.progress}% of ${worker.target}</Text>
            </View>
          </View>
        ))}

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Revenue</Text>
          <Text style={styles.sectionLink}>Live</Text>
        </View>

        <View style={styles.revenueCard}>
          <View style={styles.revenueRow}>
            <Text style={styles.miniLabel}>Monthly revenue</Text>
            <Text style={styles.revenueValue}>${revenueSummary.totalMonthly.toLocaleString()}</Text>
          </View>
          <View style={styles.revenueRow}>
            <Text style={styles.miniLabel}>BTC tracked</Text>
            <Text style={styles.revenueValue}>{revenueSummary.totalBTC.toFixed(3)} BTC</Text>
          </View>
          <View style={styles.revenueRow}>
            <Text style={styles.miniLabel}>Pending payouts</Text>
            <Text style={styles.revenueValue}>${revenueSummary.pendingPayouts.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <Text style={styles.sectionLink}>Updated now</Text>
        </View>

        <View style={styles.activityCard}>
          {activityFeed.map((item) => (
            <View key={item} style={styles.activityRow}>
              <View style={styles.dot} />
              <Text style={styles.activityText}>{item}</Text>
            </View>
          ))}
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
    padding: theme.spacing.lg,
    paddingBottom: 48,
  },
  headerGradient: {
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  kicker: {
    color: theme.colors.gold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  balanceChip: {
    backgroundColor: 'rgba(246, 199, 106, 0.08)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  balanceLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  balanceValue: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mainLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  mainValue: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 8,
  },
  mainSubvalue: {
    color: theme.colors.gold,
    fontSize: 16,
    marginTop: 6,
    marginBottom: 18,
  },
  startButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#181a1a',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  startButtonActive: {
    backgroundColor: '#1d3229',
    borderColor: 'rgba(56, 211, 159, 0.35)',
  },
  stopButton: {
    backgroundColor: '#2a1c14',
    borderColor: 'rgba(246, 199, 106, 0.35)',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statBox: {
    width: '48%',
    backgroundColor: theme.colors.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 14,
  },
  statLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  sectionLink: {
    color: theme.colors.gold,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  workerCard: {
    backgroundColor: theme.colors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 14,
  },
  workerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  workerName: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  workerMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  indicatorActive: {
    backgroundColor: theme.colors.green,
  },
  indicatorIdle: {
    backgroundColor: theme.colors.red,
  },
  workerMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricText: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  progressWrap: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1c2224',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: theme.colors.gold,
  },
  progressText: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 8,
  },
  revenueCard: {
    backgroundColor: theme.colors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 14,
  },
  revenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  miniLabel: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  revenueValue: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  activityCard: {
    backgroundColor: theme.colors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.gold,
    borderRadius: 10,
    marginRight: 12,
  },
  activityText: {
    color: theme.colors.text,
    fontSize: 14,
    flexShrink: 1,
  },
});
