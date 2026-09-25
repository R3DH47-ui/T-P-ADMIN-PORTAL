import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EXPO_COLORS } from '../colors';
import { TRAININGS_DATA } from '../../constants/data';

export default function TrainingManagementScreen() {
  const [trainings] = useState(TRAININGS_DATA);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 05 • SKILL CERTIFICATIONS</Text>
        <Text style={styles.title}>Training Management</Text>
        <Text style={styles.subtitle}>
          Upskilling tracks, attendance records, and faculty mentors.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>⚡ 3 Active Skill Sprints</Text>
        <Text style={styles.heroTitle}>Pre-Placement Training Track</Text>
        <Text style={styles.heroDesc}>
          Java Microservices, DSA Mastery, EV Systems &amp; Corporate Soft Skills.
        </Text>
      </View>

      {trainings.map((tr) => {
        const percent = Math.round((tr.sessionsDone / tr.totalSessions) * 100);
        return (
          <View key={tr.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>📖</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{tr.title}</Text>
                <Text style={styles.cardTrainer}>{tr.trainer}</Text>
              </View>
              <Text style={styles.statusPill}>{tr.status}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>Dept: {tr.dept}</Text>
              <Text style={styles.metaText}>Duration: {tr.duration}</Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>Sessions Completed</Text>
                <Text style={styles.progressValue}>{tr.sessionsDone}/{tr.totalSessions} ({percent}%)</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.attendanceText}>Attendance: {tr.attendanceRate}</Text>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Alert.alert('Curriculum', `Materials: ${tr.materials.join(', ')}`)}
              >
                <Text style={styles.actionBtnText}>Materials &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
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
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: EXPO_COLORS.tintMaroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 16 },
  cardInfo: { flex: 1, marginLeft: 10 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  cardTrainer: { fontSize: 10, color: EXPO_COLORS.textSecondary, marginTop: 1 },
  statusPill: {
    fontSize: 10,
    fontWeight: '700',
    color: EXPO_COLORS.primary,
    backgroundColor: EXPO_COLORS.tintMaroon,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  metaText: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  progressContainer: { marginTop: 10 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  progressValue: { fontSize: 10, color: EXPO_COLORS.primary, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: EXPO_COLORS.surfaceContainerLow, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: EXPO_COLORS.primary, borderRadius: 3 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  attendanceText: { fontSize: 11, color: EXPO_COLORS.successGreen, fontWeight: '700' },
  actionBtn: { paddingVertical: 4, paddingHorizontal: 8 },
  actionBtnText: { color: EXPO_COLORS.primary, fontSize: 11, fontWeight: '700' },
});
