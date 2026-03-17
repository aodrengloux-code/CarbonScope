import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function KpiCard({ label, value, unit, emoji }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiEmoji}>{emoji}</Text>
      <Text style={styles.kpiValue}>
        {typeof value === 'number'
          ? value.toLocaleString('fr-FR', { maximumFractionDigits: 3 })
          : value}
      </Text>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiUnit}>{unit}</Text>
    </View>
  );
}

export default function SiteDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { site } = route.params;

  const constructionPct =
    site.totalCo2Tons > 0
      ? Math.round((site.constructionCo2Tons / site.totalCo2Tons) * 100)
      : 0;
  const exploitationPct = 100 - constructionPct;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Résultat — {site.name}</Text>
        <Text style={styles.heroValue}>
          {site.totalCo2Tons.toLocaleString('fr-FR', { minimumFractionDigits: 3 })}
        </Text>
        <Text style={styles.heroUnit}>tonnes CO₂ équivalent</Text>
      </View>

      {/* KPIs */}
      <View style={styles.kpiGrid}>
        <KpiCard
          emoji="🏗️"
          label="Construction"
          value={site.constructionCo2Tons}
          unit={`tCO₂e · ${constructionPct}%`}
        />
        <KpiCard
          emoji="⚡"
          label="Exploitation"
          value={site.exploitationCo2Tons}
          unit={`tCO₂e · ${exploitationPct}%`}
        />
      </View>

      {/* Progress bar */}
      <View style={styles.barSection}>
        <View style={styles.barLabels}>
          <Text style={styles.barLabelText}>Construction {constructionPct}%</Text>
          <Text style={styles.barLabelText}>Exploitation {exploitationPct}%</Text>
        </View>
        <View style={styles.barContainer}>
          <View style={[styles.barConstruction, { flex: constructionPct || 1 }]} />
          <View style={[styles.barExploitation, { flex: exploitationPct || 1 }]} />
        </View>
      </View>

      {/* Ratios */}
      <View style={styles.ratioSection}>
        <View style={styles.ratioCard}>
          <Text style={styles.ratioValue}>
            {site.co2PerM2.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
          </Text>
          <Text style={styles.ratioLabel}>tCO₂e / m²</Text>
        </View>
        <View style={styles.ratioCard}>
          <Text style={styles.ratioValue}>
            {site.co2PerEmployee.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
          </Text>
          <Text style={styles.ratioLabel}>tCO₂e / employé</Text>
        </View>
      </View>

      {/* Site details */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Détails du site</Text>
        <DetailRow label="Surface" value={`${site.surfaceM2?.toLocaleString('fr-FR')} m²`} />
        <DetailRow label="Parking" value={`${site.parkingSpots} places`} />
        <DetailRow label="Énergie" value={`${site.energyMwh?.toLocaleString('fr-FR')} MWh/an`} />
        <DetailRow label="Employés" value={`${site.employees?.toLocaleString('fr-FR')}`} />
        <DetailRow label="Postes" value={`${site.workstations?.toLocaleString('fr-FR')}`} />
      </View>

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Retour à la liste</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroValue: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  heroUnit: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: -20,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  kpiEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 4,
  },
  kpiUnit: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  barSection: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  barLabelText: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
  },
  barContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  barConstruction: {
    backgroundColor: '#16a34a',
  },
  barExploitation: {
    backgroundColor: '#34d399',
  },
  ratioSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 12,
  },
  ratioCard: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  ratioValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16a34a',
  },
  ratioLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 4,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  backButton: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  backButtonText: {
    color: '#16a34a',
    fontWeight: '700',
    fontSize: 14,
  },
});
