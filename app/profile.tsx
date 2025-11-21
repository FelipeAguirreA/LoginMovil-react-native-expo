import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../components/context/auth-context";

const displayNames: Record<string, string> = {
  "user1@example.com": "Alejandro Vargas",
  "user2@example.com": "Camila Herrera",
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const displayName = displayNames[user.email] ?? "Usuario autenticado";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Perfil del usuario</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{displayName}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button title="Volver" onPress={() => router.push("/home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5fb",
    padding: 24,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 4,
  },
  buttonRow: {
    alignItems: "center",
  },
});
