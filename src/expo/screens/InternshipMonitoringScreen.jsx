import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EXPO_COLORS } from '../colors';
import { INTERNSHIPS_DATA } from '../../constants/data';

export default function InternshipMonitoringScreen() {
  const [internships] = useState(INTERNSHIPS_DATA);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 06 • EXPERIENTIAL LEARNING</Text>
        <Text style={styles.title}>Internship Monitoring</Text>
        <Text style={styles.subtitle}>
          Mandatory 6-month industrial tracks, stipends, and mentor reviews.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>✓ 312 Active Internships</Text>
        <Text style={styles.heroTitle}>Mandatory Semester Track</Text>
        <Text style={styles.heroDesc}>
          92.4% Mentor Assigned • ₹32,500 Average Monthly Corporate Stipend.
        </Text>
      </View>

      {internships.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.studentName.split(' ').map((n) => n[0]).join('').substring(0, 2)}
              </Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.studentName}</Text>
              <Text style={styles.cardRoll}>{item.roll}</Text>
            </View>
            <Text style={styles.statusPill}>{item.status}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Company: </Text>
              <Text style={styles.detailValue}>{item.company}</Text>
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Role: </Text>
              <Text style={styles.detailValue}>{item.role}</Text>
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Stipend: </Text>
              <Text style={styles.stipendValue}>{item.stipend}</Text>
            </Text>
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Faculty Mentor: </Text>
              <Text style={styles.detailValue}>{item.mentor}</Text>
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Internship Completion</Text>
              <Text style={styles.progressValue}>{item.progress}% Concluded</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${item.progress}%`,
                    backgroundColor:
                      item.progress === 100
                        ? EXPO_COLORS.successGreen
                        : item.progress < 60
                        ? '#EF4444'
                        : EXPO_COLORS.primary,
                  },
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              Alert.alert(
                'Evaluation Log',
                `Scholar: ${item.studentName}\nCompany: ${item.company}\nCertificate Hash: ${item.certificateHash}`
              )
            }
          >
            <Text style={styles.actionBtnText}>View Evaluation &amp; Certificate &gt;</Text>
          </TouchableOpacity>
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: EXPO_COLORS.tintBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: EXPO_COLORS.infoBlue, fontWeight: '700', fontSize: 13 },
  cardInfo: { flex: 1, marginLeft: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  cardRoll: { fontSize: 10, color: EXPO_COLORS.textSecondary, marginTop: 1 },
  statusPill: {
    fontSize: 10,
    fontWeight: '700',
    color: EXPO_COLORS.primary,
    backgroundColor: EXPO_COLORS.tintMaroon,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  detailBox: {
    backgroundColor: EXPO_COLORS.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    gap: 3,
  },
  detailRow: { fontSize: 11 },
  detailLabel: { color: EXPO_COLORS.textSecondary, fontWeight: '600' },
  detailValue: { color: EXPO_COLORS.textPrimary, fontWeight: '600' },
  stipendValue: { color: EXPO_COLORS.primary, fontWeight: '700' },
  progressContainer: { marginTop: 10 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  progressValue: { fontSize: 10, color: EXPO_COLORS.primary, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: EXPO_COLORS.surfaceContainerLow, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  actionBtn: {
    backgroundColor: EXPO_COLORS.surfaceContainer,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  actionBtnText: { color: EXPO_COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
});
