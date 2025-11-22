import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
    title: string;
}

export function Header({
    title,
}: HeaderProps) {
    
    return (
        <View>
            <Text style={styles.heading}>{title}</Text>
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