import { Task } from "@/constants/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../ui/button";
import { ToggleTaskButton } from "../ui/toggle-button";

interface TaskItemCardProps {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItemCard({ item, onToggle, onDelete }: TaskItemCardProps) {
  return (
    <View
      style={[
        styles.taskCard,
        item.completed && styles.bookReadBorder
        // item.completed && styles.bookReadBackground
      ]}
    >
      <Text
        style={[
          styles.taskTitle,
          item.completed && styles.taskCompleted,
        ]}
      >
        {item.title}
      </Text>

      {item.location ? (
        <Text style={styles.taskMeta}>
          Ubicación: {item.location.latitude.toFixed(5)}, {item.location.longitude.toFixed(5)}
        </Text>
      ) : null}

      <Image source={{ uri: item.photoUri }} style={styles.taskImage} />

      <View style={styles.taskActions}>
        <ToggleTaskButton
          completed={item.completed} onPress={() => onToggle(item.id)}
        />

        <Button text="Eliminar" type="danger" onPress={() => onDelete(item.id)} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#0f172a",
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#16a34a",
  },
  taskMeta: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  taskImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookReadBorder: {
  borderColor: "#16a34a",
},
  /* bookReadBackground: {
    backgroundColor: "#def8e7ff",
  }, */
})
