// app/(tabs)/perfil.tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PerfilScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  // Si el email no viene por query params, intentamos leer la variable global
  // que el login puede haber escrito: __APP_USER_EMAIL. Es una solución
  // ligera que evita agregar contexto o archivos nuevos.
  const globalEmail = (globalThis as any).__APP_USER_EMAIL as string | undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil </Text>
      <Text style={styles.label}>Email registrado:</Text>
  <Text style={styles.email}>{email ?? globalEmail ?? "No se recibió email"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
  },
});
