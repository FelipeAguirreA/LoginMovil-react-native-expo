import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Redirige inmediatamente a la pantalla de login
  return <Redirect href="/login" />;
}