import { Task } from "@/constants/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TaskItemCard } from "./task-item-card";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItemCard
      item={item}
      onToggle={onToggleTask}
      onDelete={onDeleteTask}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
});
