import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { EXPO_COLORS } from '../colors';
import { DRIVES_DATA } from '../../constants/data';

export default function DriveManagementScreen() {
  const [drives] = useState(DRIVES_DATA);
  const [filter, setFilter] = useState('all');

  const filtered = drives.filter((d) =>
    filter === 'all' ? true : d.category === filter
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 03 • PLACEMENT DRIVES</Text>
        <Text style={styles.title}>Drive Management</Text>
        <Text style={styles.subtitle}>
          Campus interview schedules, assessment rounds, and live hall tickets.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>⚡ NEXT UPCOMING ON-CAMPUS DRIVE</Text>
        <Text style={styles.heroTitle}>TCS Digital &amp; Ninja 2025</Text>
        <Text style={styles.heroDesc}>
          Oct 14, 2025 • 09:00 AM • Auditorium 1 &amp; Lab 4
        </Text>
        <Text style={styles.heroPackage}>₹7.5 – ₹11.5 LPA • 320 Candidates</Text>
        <TouchableOpacity
          style={styles.heroBtn}
          onPress={() => Alert.alert('TCS Round 2', 'Launching assessment invigilation dashboard.')}
        >
          <Text style={styles.heroBtnText}>Manage Round 2 Live →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['all', 'upcoming', 'ongoing', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, filter === tab && styles.filterPillTextActive]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filtered.map((drive) => (
        <View key={drive.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>🏢</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{drive.title}</Text>
              <Text style={styles.cardDate}>{drive.date}</Text>
            </View>
            <Text style={styles.statusPill}>{drive.status}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailText}>📍 {drive.location}</Text>
            <Text style={styles.packageText}>💰 Package: {drive.packageText}</Text>
            <Text style={styles.eligibilityText}>🎓 {drive.eligibility}</Text>
            <Text style={styles.roundText}>⏳ Stage: {drive.currentRound}</Text>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              Alert.alert(
                drive.title,
                `Liaison: ${drive.liaison}\nRegistered: ${drive.registeredCount} candidates\nPackage: ${drive.packageText}`
              )
            }
          >
            <Text style={styles.actionBtnText}>View Assessment Timeline</Text>
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
  heroPackage: { color: EXPO_COLORS.goldFixed, fontSize: 12, fontWeight: '700', marginTop: 4 },
  heroBtn: {
    backgroundColor: EXPO_COLORS.goldFixed,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  heroBtnText: { color: '#251A00', fontSize: 11, fontWeight: '800' },
  filterBar: { marginBottom: 16 },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
    marginRight: 8,
  },
  filterPillActive: { backgroundColor: EXPO_COLORS.primary, borderColor: EXPO_COLORS.primary },
  filterPillText: { fontSize: 11, color: EXPO_COLORS.textSecondary, fontWeight: '600' },
  filterPillTextActive: { color: '#FFF' },
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
  cardDate: { fontSize: 10, color: EXPO_COLORS.textSecondary, marginTop: 1 },
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
    gap: 4,
  },
  detailText: { fontSize: 11, color: EXPO_COLORS.textPrimary },
  packageText: { fontSize: 11, fontWeight: '700', color: EXPO_COLORS.primary },
  eligibilityText: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  roundText: { fontSize: 10, color: EXPO_COLORS.infoBlue, fontWeight: '600' },
  actionBtn: {
    backgroundColor: EXPO_COLORS.surfaceContainer,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  actionBtnText: { color: EXPO_COLORS.textPrimary, fontSize: 11, fontWeight: '700' },
});
