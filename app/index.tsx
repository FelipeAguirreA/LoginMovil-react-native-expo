import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige inmediatamente a la pantalla de login
  return <Redirect href="/login" />;
}