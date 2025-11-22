import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    type?: 'primary' | 'outlined' | 'success' | 'danger' | 'warning' | 'logout' | 'login';
    text: string
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    disabled?: boolean
    loading?: boolean
}

export default function Button({
    type = 'primary',
    text,
    onPress,
    style,
    disabled = false,
    loading = false
}: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, styles[type], style, (disabled || loading) && { opacity: 0.5 }]} onPress={onPress}>
            <Text style={[styles.buttonText, type === 'outlined' && styles.buttonTextOutlined]}>
                {loading ? 'Cargando...' : text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    success: {
        backgroundColor: '#4CAF50',
    },
    danger: {
        borderColor: "#dc2626",
        backgroundColor: "#e46c6cff",
    },
    warning: {
        backgroundColor: '#FFC107',
    },
    logout: {
    marginTop: 16,
    marginBottom: 32,
  },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonTextOutlined: {
        color: '#007AFF',
    },
    login: {
    backgroundColor: '#6B46C1', 
    //paddingVertical: 14,
    //borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    shadowColor: '#6B46C1',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
    },
})