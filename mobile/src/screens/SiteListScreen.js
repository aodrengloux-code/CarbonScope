import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getHistory } from '../api';
import { useAuth } from '../AuthContext';

export default function SiteListScreen() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const fetchSites = async () => {
    try {
      const res = await getHistory();
      setSites(res.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSites();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchSites();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SiteDetail', { site: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.siteName}>{item.name}</Text>
        <Text style={styles.siteDate}>
          {new Date(item.calculatedAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>
            {item.totalCo2Tons.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
          </Text>
          <Text style={styles.metricLabel}>tCO₂e total</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>
            {item.co2PerM2.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
          </Text>
          <Text style={styles.metricLabel}>tCO₂e/m²</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>
            {item.co2PerEmployee.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
          </Text>
          <Text style={styles.metricLabel}>tCO₂e/emp.</Text>
        </View>
      </View>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barConstruction,
            {
              flex: item.constructionCo2Tons,
            },
          ]}
        />
        <View
          style={[
            styles.barExploitation,
            {
              flex: item.exploitationCo2Tons,
            },
          ]}
        />
      </View>
      <View style={styles.barLabels}>
        <Text style={styles.barLabel}>Construction</Text>
        <Text style={styles.barLabel}>Exploitation</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mes sites</Text>
          <Text style={styles.subtitle}>{sites.length} calcul{sites.length !== 1 ? 's' : ''} enregistré{sites.length !== 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('SiteForm')}
          >
            <Text style={styles.addButtonText}>+ Nouveau</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutButtonText}>⏻</Text>
          </TouchableOpacity>
        </View>
      </View>

      {sites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📊</Text>
          <Text style={styles.emptyText}>Aucun calcul enregistré</Text>
          <Text style={styles.emptySubtext}>Appuyez sur "Nouveau" pour commencer</Text>
        </View>
      ) : (
        <FlatList
          data={sites}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#16a34a" />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  logoutButtonText: {
    fontSize: 16,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  siteName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  siteDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16a34a',
  },
  metricLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
    fontWeight: '500',
  },
  barContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  barConstruction: {
    backgroundColor: '#16a34a',
    borderRadius: 3,
  },
  barExploitation: {
    backgroundColor: '#34d399',
    borderRadius: 3,
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '500',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#d1d5db',
    marginTop: 4,
  },
});
