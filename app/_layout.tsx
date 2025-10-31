// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login */}
      <Stack.Screen
        name="index"
        options={{ title: "Login" }}
      />

      {/* Tabs */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Esto venía con el template de Expo (ejemplo de modal).
         Lo dejamos, no afecta tu evaluación. */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Modal",
        }}
      />
    </Stack>
  );
}
