import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EXPO_COLORS } from '../colors';
import { REPORTS_DATA } from '../../constants/data';

export default function ReportGenerationScreen() {
  const [reports] = useState(REPORTS_DATA);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 07 • STATUTORY AUDIT &amp; NAAC</Text>
        <Text style={styles.title}>Report Generation</Text>
        <Text style={styles.subtitle}>
          One-click generation of placement registers, CTC audits, and NIRF forms.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>⚡ 18 Reports Generated This Month</Text>
        <Text style={styles.heroTitle}>Institutional Audit Engine</Text>
        <Text style={styles.heroDesc}>
          Export PDF and Excel reports sealed with cryptographic signatures.
        </Text>
      </View>

      {reports.map((rep) => (
        <View key={rep.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    rep.format === 'PDF' ? EXPO_COLORS.tintMaroon : EXPO_COLORS.tintGreen,
                },
              ]}
            >
              <Text
                style={{
                  color: rep.format === 'PDF' ? EXPO_COLORS.primary : EXPO_COLORS.successGreen,
                  fontSize: 16,
                  fontWeight: '800',
                }}
              >
                {rep.format}
              </Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{rep.name}</Text>
              <Text style={styles.cardMeta}>
                {rep.type} • {rep.cycle}
              </Text>
            </View>
          </View>

          <Text style={styles.descText}>{rep.description}</Text>

          <View style={styles.cardFooter}>
            <Text style={styles.dateText}>{rep.generatedDate}</Text>
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => Alert.alert('Download', `Downloading verified ${rep.name} (${rep.format}).`)}
            >
              <Text style={styles.downloadBtnText}>Download {rep.format}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  heroBadgeText: { color: EXPO_COLORS.goldFixed, fontSize: 10, fontWeight: '700', marginBottom: 4 },
  heroTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  heroDesc: { color: '#CBD5E1', fontSize: 11, marginTop: 4 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 44,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1, marginLeft: 10 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  cardMeta: { fontSize: 10, color: EXPO_COLORS.textSecondary, marginTop: 2 },
  descText: { fontSize: 11, color: EXPO_COLORS.textSecondary, marginTop: 8, lineHeight: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  dateText: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  downloadBtn: {
    backgroundColor: EXPO_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  downloadBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
