import { TaskList } from "@/components/tasks/task-list";
import { Header } from "@/components/ui/header";
import { Task } from "@/constants/types";
import { loadTodosFromStorage, saveTodosToStorage } from "@/utils/storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/context/auth-context";
import Button from "../components/ui/button";

export default function HomeScreen() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const reloadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    try {
      const storedTodos = await loadTodosFromStorage();
      setTasks(storedTodos.filter((task) => task.userEmail === user.email));
    } catch (err) {
      console.error("Error reloading tasks:", err);
    }
  }, [user]);

  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  useFocusEffect(
    useCallback(() => {
      reloadTasks();
    }, [reloadTasks])
  );

  const persistTasks = useCallback(
    async (updatedTasks: Task[]) => {
      if (!user) return;
      const storedTodos = await loadTodosFromStorage();
      const otherUsers = storedTodos.filter((task) => task.userEmail !== user.email);
      await saveTodosToStorage([...otherUsers, ...updatedTasks]);
    },
    [user]
  );

  const handleToggleTask = async (taskId: string) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    await persistTasks(updated);
  };

  const handleDeleteTask = async (taskId: string) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    setTasks(updated);
    await persistTasks(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Biblioteca de ${user?.name}`} />

      <Button
        text="Agregar libro"
        type="primary"
        onPress={() => router.push("/add-task")}
      />

      <Text style={{ textAlign: "center", fontSize: 26, fontWeight: "700", marginBottom: 12, color: "#374151", marginTop: 22 }}>
        Libros
      </Text>

      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5fb",
    padding: 24,
    paddingBottom: 0,
  },
});
