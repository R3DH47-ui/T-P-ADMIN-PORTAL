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
import { COMPANIES_DATA } from '../../constants/data';

export default function CompanyManagementScreen() {
  const [companies] = useState(COMPANIES_DATA);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = companies.filter((c) => {
    const matchesFilter = filter === 'all' ? true : c.category.includes(filter);
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MODULE 02 • CORPORATE DIRECTORY</Text>
        <Text style={styles.title}>Company Management</Text>
        <Text style={styles.subtitle}>
          MoU partnerships, campus SPOCs, and visit histories.
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroBadgeText}>✓ 182 Corporate Partners</Text>
        <Text style={styles.heroTitle}>Global Corporate Alliances</Text>
        <Text style={styles.heroDesc}>
          Tier-1 MNCs, fintech leaders, and core engineering giants.
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Filter company or SPOC..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['all', 'tier1', 'core', 'bfsi', 'mou'].map((tab) => (
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

      {filtered.map((comp) => (
        <View key={comp.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>{comp.shortName[0]}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{comp.name}</Text>
              <Text style={styles.cardIndustry}>{comp.industry}</Text>
            </View>
            <Text style={styles.tierBadge}>{comp.tier}</Text>
          </View>

          <View style={styles.spocBox}>
            <Text style={styles.spocName}>SPOC: {comp.spoc.name}</Text>
            <Text style={styles.spocContact}>{comp.spoc.phone} • {comp.spoc.email}</Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.ctcText}>CTC: {comp.ctc}</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Liaison Info',
                  `Company: ${comp.name}\nRole: ${comp.spoc.role}\nEmail: ${comp.spoc.email}\nLocation: ${comp.spoc.location}`
                )
              }
              style={styles.actionBtn}
            >
              <Text style={styles.actionBtnText}>Contact SPOC</Text>
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
  heroBadgeText: { color: EXPO_COLORS.goldFixed, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  heroTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  heroDesc: { color: '#CBD5E1', fontSize: 11, marginTop: 4 },
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
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderColor: EXPO_COLORS.borderSubtle,
    borderWidth: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  logoBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: EXPO_COLORS.tintBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: EXPO_COLORS.infoBlue, fontWeight: '800', fontSize: 15 },
  cardInfo: { flex: 1, marginLeft: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  cardIndustry: { fontSize: 11, color: EXPO_COLORS.textSecondary },
  tierBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: EXPO_COLORS.primary,
    backgroundColor: EXPO_COLORS.tintMaroon,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  spocBox: {
    backgroundColor: EXPO_COLORS.surfaceContainerLow,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  spocName: { fontSize: 11, fontWeight: '700', color: EXPO_COLORS.textPrimary },
  spocContact: { fontSize: 10, color: EXPO_COLORS.textSecondary, marginTop: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  ctcText: { fontSize: 12, fontWeight: '700', color: EXPO_COLORS.primary },
  actionBtn: {
    backgroundColor: EXPO_COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
