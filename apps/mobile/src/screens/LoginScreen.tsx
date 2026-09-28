import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoldMine</Text>
      <Text style={styles.subtitle}>Earnings system for internet workers</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#8fa0a3"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          placeholderTextColor="#8fa0a3"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070909',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#f6c76a',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#c9d1d2',
    textAlign: 'center',
    marginBottom: 28,
    fontSize: 16,
  },
  card: {
    backgroundColor: theme.colors.panel,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(246, 199, 106, 0.18)',
  },
  label: {
    color: '#dfe7e7',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#101415',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(246, 199, 106, 0.12)',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f6c76a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
});
