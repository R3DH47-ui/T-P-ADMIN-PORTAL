import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { EXPO_COLORS } from '../colors';
import { STUDENTS_DATA } from '../../constants/data';

export default function StudentManagementScreen() {
  const [students] = useState(STUDENTS_DATA);
  const [selectedStudent, setSelectedStudent] = useState(STUDENTS_DATA[0]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = students.filter((s) => {
    const matchesFilter = filter === 'all' ? true : s.status === filter;
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 01 • SCHOLAR VAULT</Text>
        <Text style={styles.title}>Student Management</Text>
        <Text style={styles.subtitle}>
          Student registration records; no sample student data is loaded.
        </Text>
      </View>

      {/* Hero Summary Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Live registration records</Text>
        </View>
        <Text style={styles.heroTitle}>Comprehensive Scholar Directory</Text>
        <Text style={styles.heroDesc}>
          Only student records supplied to this directory are shown.
        </Text>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>VERIFICATION</Text>
            <Text style={styles.metricValue}>{students.length ? Math.round((students.filter((student) => student.verified).length / students.length) * 100) : '—'}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>ELIGIBLE</Text>
            <Text style={styles.metricValue}>{students.filter((student) => student.verified).length}</Text>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search scholar name or roll no..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['all', 'PENDING', 'APPROVED', 'REJECTED', 'REVOKED'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, filter === tab && styles.filterPillTextActive]}>
              {tab === 'all' ? 'ALL' : tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Roster Cards */}
      <Text style={styles.sectionTitle}>Scholars ({filtered.length})</Text>
      {filtered.map((std) => (
        <TouchableOpacity
          key={std.id}
          style={[styles.card, selectedStudent?.id === std.id && styles.cardSelected]}
          onPress={() => setSelectedStudent(std)}
        >
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{std.initials}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{std.name}</Text>
              <Text style={styles.cardRoll}>{std.roll} • {std.dept}</Text>
            </View>
            <View style={styles.cgpaBadge}>
              <Text style={styles.cgpaText}>★ {std.cgpa}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.statusPill}>{std.status}</Text>
            <Text style={styles.verifiedText}>{std.verified ? '✓ Verified' : 'Pending'}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {!filtered.length && (
        <Text style={styles.sectionTitle}>No student records are available.</Text>
      )}

      {/* Selected Scholar Dossier */}
      {selectedStudent && (
        <View style={styles.dossierBox}>
          <Text style={styles.dossierTitle}>Selected Dossier: {selectedStudent.name}</Text>
          <Text style={styles.dossierRow}>Program: {selectedStudent.program}</Text>
          <Text style={styles.dossierRow}>Email: {selectedStudent.email}</Text>
          <Text style={styles.dossierRow}>SPOC: {selectedStudent.spoc}</Text>
          <Text style={styles.dossierRow}>Attendance: {selectedStudent.attendance}</Text>
          <TouchableOpacity
            style={styles.dossierBtn}
            onPress={() => Alert.alert('Credentials', `Viewing ${selectedStudent.name}'s sealed vault tokens.`)}
          >
            <Text style={styles.dossierBtnText}>View Sealed Vault Tokens</Text>
          </TouchableOpacity>
        </View>
      )}
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
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  heroBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  heroTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  heroDesc: { color: '#CBD5E1', fontSize: 11, marginTop: 4 },
  metricRow: { flexDirection: 'row', marginTop: 12, gap: 12 },
  metricBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  metricLabel: { color: '#94A3B8', fontSize: 9, fontWeight: '700' },
  metricValue: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 2 },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 12,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
    marginBottom: 12,
  },
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
  sectionTitle: { fontSize: 14, fontWeight: '700', color: EXPO_COLORS.textPrimary, marginBottom: 8 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
  },
  cardSelected: { borderColor: EXPO_COLORS.primary, backgroundColor: EXPO_COLORS.tintMaroon },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: EXPO_COLORS.tintMaroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: EXPO_COLORS.primary, fontWeight: '700', fontSize: 13 },
  cardInfo: { flex: 1, marginLeft: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  cardRoll: { fontSize: 11, color: EXPO_COLORS.textSecondary, marginTop: 1 },
  cgpaBadge: {
    backgroundColor: EXPO_COLORS.tintMaroon,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cgpaText: { color: EXPO_COLORS.primary, fontSize: 11, fontWeight: '700' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' },
  statusPill: { fontSize: 11, color: EXPO_COLORS.infoBlue, fontWeight: '600' },
  verifiedText: { fontSize: 11, color: EXPO_COLORS.successGreen, fontWeight: '600' },
  dossierBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderColor: EXPO_COLORS.primary,
    borderWidth: 1,
  },
  dossierTitle: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.primary, marginBottom: 8 },
  dossierRow: { fontSize: 11, color: EXPO_COLORS.textSecondary, marginBottom: 4 },
  dossierBtn: {
    backgroundColor: EXPO_COLORS.primary,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  dossierBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
