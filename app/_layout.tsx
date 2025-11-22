import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../components/context/auth-context";

function RootLayoutNav() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const isOnLogin = pathname === "/login" || pathname === "/";

    if (!user && !isOnLogin) {
      router.replace("/login");
    } else if (user && isOnLogin) {
      router.replace("/(tabs)");
    }
  }, [user, pathname, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
