import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { EXPO_COLORS } from '../colors';
import { PLACEMENT_STATS } from '../../constants/data';

export default function PlacementStatisticsScreen() {
  const stats = PLACEMENT_STATS;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 04 • INSTITUTIONAL INTELLIGENCE</Text>
        <Text style={styles.title}>Placement Statistics</Text>
        <Text style={styles.subtitle}>
          NAAC &amp; NBA compliant placement performance and salary metrics.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>✓ NAAC Audit Compliant AY 2024–25</Text>
        <Text style={styles.heroTitle}>82.4% Overall Placement Rate</Text>
        <Text style={styles.heroDesc}>
          1,607 scholars placed • ₹8.65 LPA average CTC • ₹44.0 LPA highest CTC
        </Text>
      </View>

      {/* 2x2 Quick KPI Grid */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>TOTAL PLACED</Text>
          <Text style={styles.kpiValue}>1,607</Text>
          <Text style={styles.kpiSub}>+4.8% YoY</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>HIGHEST CTC</Text>
          <Text style={styles.kpiValue}>₹44.0</Text>
          <Text style={styles.kpiSub}>LPA (Google)</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>TOTAL OFFERS</Text>
          <Text style={styles.kpiValue}>1,845</Text>
          <Text style={styles.kpiSub}>Across 182 MNCs</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>AVG SALARY</Text>
          <Text style={styles.kpiValue}>₹8.65</Text>
          <Text style={styles.kpiSub}>LPA</Text>
        </View>
      </View>

      {/* CTC Bracket Breakdown */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Salary CTC Bracket Breakdown</Text>
        {stats.ctcBrackets.map((item, idx) => (
          <View key={idx} style={styles.progressRow}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>{item.label}</Text>
              <Text style={styles.progressValue}>{item.count} scholars ({item.percentage}%)</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${item.percentage * 1.5}%` }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Department Wise Conversion */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Department-Wise Conversion Index</Text>
        {stats.departmentProgress.map((dept, idx) => (
          <View key={idx} style={styles.progressRow}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>{dept.name}</Text>
              <Text style={styles.progressValue}>{dept.placed}/{dept.total} ({dept.rate})</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: dept.rate }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: EXPO_COLORS.surfaceCanvas },
  content: { padding: 16 },
  header: { marginBottom: 16 },
  eyebrow: { fontSize: 10, fontWeight: '700', color: EXPO_COLORS.primary, letterSpacing: 1 },
  title: { fontSize: 22, fontWeight: '800', color: EXPO_COLORS.textPrimary, marginTop: 4 },
  subtitle: { fontSize: 12, color: EXPO_COLORS.textSecondary, marginTop: 2 },
  heroCard: {
    backgroundColor: EXPO_COLORS.surfaceHero,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  heroBadgeText: { color: EXPO_COLORS.goldFixed, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  heroTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  heroDesc: { color: '#CBD5E1', fontSize: 11, marginTop: 4 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  kpiCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
  },
  kpiLabel: { fontSize: 9, fontWeight: '700', color: EXPO_COLORS.textSecondary },
  kpiValue: { fontSize: 20, fontWeight: '800', color: EXPO_COLORS.textPrimary, marginTop: 2 },
  kpiSub: { fontSize: 10, color: EXPO_COLORS.successGreen, marginTop: 2, fontWeight: '600' },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary, marginBottom: 10 },
  progressRow: { marginBottom: 10 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 11, color: EXPO_COLORS.textPrimary, fontWeight: '600' },
  progressValue: { fontSize: 10, color: EXPO_COLORS.primary, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: EXPO_COLORS.surfaceContainerLow, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: EXPO_COLORS.primary, borderRadius: 3 },
});
