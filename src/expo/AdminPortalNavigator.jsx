import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { EXPO_COLORS } from './colors';
import StudentManagementScreen from './screens/StudentManagementScreen';
import CompanyManagementScreen from './screens/CompanyManagementScreen';
import DriveManagementScreen from './screens/DriveManagementScreen';
import PlacementStatisticsScreen from './screens/PlacementStatisticsScreen';
import TrainingManagementScreen from './screens/TrainingManagementScreen';
import InternshipMonitoringScreen from './screens/InternshipMonitoringScreen';
import ReportGenerationScreen from './screens/ReportGenerationScreen';

const TABS = [
  { id: 'students', label: 'Scholars', icon: '🎓' },
  { id: 'companies', label: 'Companies', icon: '🏢' },
  { id: 'drives', label: 'Drives', icon: '📢' },
  { id: 'statistics', label: 'Stats', icon: '📊' },
  { id: 'trainings', label: 'Trainings', icon: '📖' },
  { id: 'internships', label: 'Interns', icon: '💼' },
  { id: 'reports', label: 'Reports', icon: '📑' },
];

export default function AdminPortalNavigator() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Brand Banner */}
      <View style={styles.topBrand}>
        <View style={styles.brandBadge}>
          <Text style={styles.brandBadgeText}>RIMT</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>RIMT Academic Trust</Text>
          <Text style={styles.brandSub}>T&amp;P Admin Portal • Expo 57</Text>
        </View>
      </View>

      {/* Screen Segment Switcher */}
      <View style={styles.tabBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Active Screen View */}
      <View style={styles.screenContainer}>
        {activeTab === 'students' && <StudentManagementScreen />}
        {activeTab === 'companies' && <CompanyManagementScreen />}
        {activeTab === 'drives' && <DriveManagementScreen />}
        {activeTab === 'statistics' && <PlacementStatisticsScreen />}
        {activeTab === 'trainings' && <TrainingManagementScreen />}
        {activeTab === 'internships' && <InternshipMonitoringScreen />}
        {activeTab === 'reports' && <ReportGenerationScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: EXPO_COLORS.surfaceCanvas },
  topBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: EXPO_COLORS.borderSubtle,
    gap: 10,
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: EXPO_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadgeText: { color: '#FFF', fontWeight: '800', fontSize: 11 },
  brandTitle: { fontSize: 13, fontWeight: '800', color: EXPO_COLORS.textPrimary },
  brandSub: { fontSize: 10, color: EXPO_COLORS.textSecondary },
  tabBarContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: EXPO_COLORS.borderSubtle,
  },
  tabBar: { paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: EXPO_COLORS.surfaceContainerLow,
    gap: 4,
  },
  tabButtonActive: {
    backgroundColor: EXPO_COLORS.primary,
  },
  tabIcon: { fontSize: 12 },
  tabText: { fontSize: 11, fontWeight: '600', color: EXPO_COLORS.textSecondary },
  tabTextActive: { color: '#FFF' },
  screenContainer: { flex: 1 },
});
