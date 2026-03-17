import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { calculate } from '../api';

const DEMO_DATA = {
  name: 'Siège Rennes',
  surfaceM2: '11771',
  parkingSpots: '308',
  energyMwh: '1840',
  employees: '1800',
  workstations: '1037',
};

const fields = [
  { key: 'surfaceM2', label: 'Surface totale (m²)', placeholder: '11771', keyboard: 'numeric' },
  { key: 'parkingSpots', label: 'Places de parking', placeholder: '308', keyboard: 'numeric' },
  { key: 'energyMwh', label: 'Conso. énergétique (MWh/an)', placeholder: '1840', keyboard: 'numeric' },
  { key: 'employees', label: "Nombre d'employés", placeholder: '1800', keyboard: 'numeric' },
  { key: 'workstations', label: 'Postes de travail', placeholder: '1037', keyboard: 'numeric' },
];

export default function SiteFormScreen() {
  const [form, setForm] = useState({
    name: '',
    surfaceM2: '',
    parkingSpots: '',
    energyMwh: '',
    employees: '',
    workstations: '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const loadDemo = () => {
    setForm(DEMO_DATA);
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      Alert.alert('Erreur', 'Le nom du site est obligatoire');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        surfaceM2: parseFloat(form.surfaceM2),
        parkingSpots: parseInt(form.parkingSpots),
        energyMwh: parseFloat(form.energyMwh),
        employees: parseInt(form.employees),
        workstations: parseInt(form.workstations),
      };
      const res = await calculate(payload);
      navigation.navigate('SiteDetail', { site: res.data });
    } catch (err) {
      Alert.alert(
        'Erreur',
        err.response?.data?.message || 'Erreur lors du calcul'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.formCard}>
          {/* Site name */}
          <Text style={styles.label}>
            Nom du site <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(v) => handleChange('name', v)}
            placeholder="Ex: Siège Rennes"
            placeholderTextColor="#9ca3af"
          />

          {/* Numeric fields */}
          {fields.map(({ key, label, placeholder, keyboard }) => (
            <View key={key}>
              <Text style={styles.label}>
                {label} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={form[key]}
                onChangeText={(v) => handleChange(key, v)}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                keyboardType={keyboard}
              />
            </View>
          ))}

          {/* Buttons */}
          <TouchableOpacity style={styles.demoButton} onPress={loadDemo}>
            <Text style={styles.demoButtonText}>📋 Charger données démo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Calculer l'empreinte</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 14,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  demoButton: {
    borderWidth: 2,
    borderColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  demoButtonText: {
    color: '#16a34a',
    fontWeight: '700',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
