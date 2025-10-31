// app/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<"email" | "password" | null>(null);

  const handleLogin = () => {
    // Validación simple del email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Ingresa un email válido");
      setErrorField("email");
      return;
    }

    // luego comprobamos la contraseña
    if (password !== "1234") {
      setErrorMsg("Contraseña incorrecta");
      setErrorField("password");
      return;
    }

    // sólo permitimos felipe@gmail.com
    const allowedEmail = "felipe@gmail.com";
    if (email.trim().toLowerCase() !== allowedEmail) {
      setErrorMsg("El email no está autorizado para iniciar sesión");
      setErrorField("email");
      return;
    }

    // Se puede poner replace aquí si se desea no volver a la pantalla de login
    (globalThis as any).__APP_USER_EMAIL = email.trim();
    router.push("/(tabs)");
  };

  // Limpiar mensajes de error automáticamente
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 5000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Bienvenido a mi primera app movil</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, errorField === "email" && styles.inputError]}
              placeholder="tu@email.com"
              placeholderTextColor="#2b4e8b80"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMsg) setErrorMsg(null);
                if (errorField === "email") setErrorField(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.field}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Contraseña</Text>
            </View>
            <TextInput
              style={[styles.input, errorField === "password" && styles.inputError]}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#2b4e8b80"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errorMsg) setErrorMsg(null);
                if (errorField === "password") setErrorField(null);
              }}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexGrow: 1 },
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 48,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  form: {
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 420,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e6eef9',
    shadowColor: '#0b1226',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6B46C1', 
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#6B46C1',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
  }
});
