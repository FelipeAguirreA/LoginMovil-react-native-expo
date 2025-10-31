// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla Home 🏠</Text>
      <Text style={styles.subtext}>Bienvenido a la app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: "#555",
  },
});
