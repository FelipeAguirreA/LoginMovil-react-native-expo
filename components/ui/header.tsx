import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./button";

interface HeaderProps {
    title: string;
}

export function Header({
    title,
}: HeaderProps) {
      const router = useRouter();
    
    return (
        <View>
            <Text style={styles.heading}>{title}</Text>
            <Button text="Perfil" type="login" onPress={() => router.push("/profile")}  />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 18,
        color: "#1f2937",
        textAlign: "center",
    },
    profileButtonRow: {
        alignSelf: "flex-start",
        marginBottom: 12,
    },
});