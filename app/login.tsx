import Button from "@/components/ui/button";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../components/context/auth-context";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const result = signIn(email, password);

    if (!result.success) {
      Alert.alert("Error", result.error ?? "Email o contraseña incorrectos");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>

         <Ionicons name="book-outline" size={28} color="#1d4ed8" style={styles.icon} />
        
        <Text style={styles.heading}>Bienvenido</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="user1@example.com"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="1234"
            secureTextEntry
          />

          <Button text="Iniciar sesión" type= "login" onPress={handleLogin}/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexGrow: 1 },
  container: {
    flex: 1,
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 24,
    backgroundColor: "#f7f7f7",
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  icon: {
    textAlign: "center",
    maxHeight: 200
  },
});
