import { User } from '@/constants/types';
import {
  clearSessionFromStorage,
  loadSessionFromStorage,
  saveSessionToStorage,
} from '@/utils/storage';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => AuthResult;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadSessionFromStorage().then((session) => {
      if (session) setUser(session);
    });
  }, []);

  const signIn = (email: string, password: string): AuthResult => {
    const validUsers = [
      { email: "user1@example.com", password: "1234", name: "Alejandro Vargas" },
      { email: "user2@example.com", password: "1234", name: "Camila Herrera"  },
    ];

    const foundUser = validUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!foundUser || foundUser.password !== password) {
      return { success: false, error: "Email o contraseña incorrectos" };
    }

    const authenticatedUser = { email: foundUser.email, name: foundUser.name };
    setUser(authenticatedUser);
    saveSessionToStorage(authenticatedUser).catch((error) => {
      console.error('No se pudo guardar la sesión:', error);
    });
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    clearSessionFromStorage().catch((error) => {
      console.error('No se pudo limpiar la sesión:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
