
# App de evaluación (React Native, Expo + TypeScript)

Esta es una pequeña aplicación React Native. Está pensada para ser clara y demostrativa: un flujo de login sencillo, navegación por pestañas con Expo Router y ejemplos de uso de hooks y tipado en TypeScript.

## Requisitos

- Node >= 16
- npm
- Expo (no es obligatorio instalar globalmente; se puede usar con npx)

## Instalación

Desde la carpeta del proyecto ejecuta en la consola:

npm install

## Ejecutar en desarrollo

npx expo start

Abre el emulador Android Studio si lo quieres probar directamente desde tu computadora o la app Expo Go en tu dispositivo movil y escanea el QR.

## Qué incluye la app

- Pantalla de Login (`app/index.tsx`) con campos Email y Password (secureTextEntry).
- Validación simple: la contraseña esperada para la demo es `1234`. Si no coincide, se muestra "Contraseña incorrecta".
- Validación simple de correo electronico esperado: `felipe@gmail.com`.
- Navegación con Expo Router; al iniciar sesión de forma satisfactoria se vera un layout con pestañas (Tabs):
  - Home (`app/(tabs)/index.tsx`) — pantalla de bienvenida.
  - Perfil (`app/(tabs)/perfil.tsx`) — muestra el email que ingresaste en el login `felipe@gmail.com` (se puede definir otro si es necesario para pruebas).
- Ejemplos de uso de hooks (`useState`, `useEffect`) y tipado básico en TypeScript.

## Cómo probar (casos clave)

1. Abre la app.
2. En la pantalla de Login prueba lo siguiente:
   - Dejar el email vacío o inválido y pulsar "Iniciar sesión" → verás "Ingresa un email válido".
   - Poner un email válido y una contraseña distinta de `1234` → verás "Contraseña incorrecta".
   - Poner contraseña `1234` + el correo establecido de ejemplo `felipe@gmail.com` → navegarás a la vista con Tabs; en "Perfil" verás el email ingresado.

## Estructura relevante

- `app/index.tsx` — Login
- `app/(tabs)/_layout.tsx` — define las Tabs con `expo-router`
- `app/(tabs)/index.tsx` — Home
- `app/(tabs)/perfil.tsx` — Perfil (muestra email)

## Stack y componentes principales

- Plataforma: React Native (Expo).
- Lenguaje: TypeScript.
- Navegación: Expo Router (file-based routing).
- Componentes nativos usados (ejemplos): `View`, `Text`, `TextInput`, `SafeAreaView`, `TouchableOpacity` / `Pressable`, `Button`, `Image`.
- Hooks principales: `useState`, `useEffect`.
- Estilos: `StyleSheet` y componentes temáticos bajo `components/` (p. ej. `themed-view.tsx`, `themed-text.tsx`).

## Demo (video)

A continuación está el video demo que muestra el flujo de la app: validaciones de login (error y éxito), la navegación por Tabs y la vista Perfil mostrando el email.

- Video demo: https://ipciisa-my.sharepoint.com/:v:/g/personal/felipe_aguirre_aravena_estudiante_ipss_cl/EcrVoKFd4xVJsdW9U6B8dQ4Bx-OSdKMSVde0LJLdvByEKQ

## Notas 

Me apoyé con Copilot (By Coding) para acelerar partes del desarrollo.
