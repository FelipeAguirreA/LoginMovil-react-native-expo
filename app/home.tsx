// app/home.tsx
import { Task } from "@/constants/types";
import { loadTodosFromStorage, saveTodosToStorage } from "@/utils/storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../components/context/auth-context";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const reloadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    const storedTodos = await loadTodosFromStorage();
    setTasks(storedTodos.filter((task) => task.userEmail === user.email));
  }, [user]);

  const persistTasks = useCallback(
    async (updatedTasks: Task[]) => {
      if (!user) {
        return;
      }
      const storedTodos = await loadTodosFromStorage();
      const otherUsers = storedTodos.filter((task) => task.userEmail !== user.email);
      await saveTodosToStorage([...otherUsers, ...updatedTasks]);
    },
    [user]
  );

  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

    const handleTakePhoto = useCallback(async () => {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permiso requerido", "Necesitamos acceso a la cámara para tomar la foto.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
      });

      if (result.canceled || result.assets.length === 0) {
        return;
      }

      setPhotoUri(result.assets[0].uri);
    }, []);

  const handleCreateTask = async () => {
    if (!user) {
      return;
    }

    if (!title.trim()) {
      Alert.alert("Título requerido", "Ingresa un título para la tarea.");
      return;
    }

    if (!photoUri) {
      Alert.alert("Foto requerida", "Agrega una imagen para la tarea.");
      return;
    }

    setIsSaving(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        Alert.alert(
          "Permiso de ubicación",
          "Activa la ubicación para registrar desde dónde creaste la tarea."
        );
        return;
      }

      const coordinates = await Location.getCurrentPositionAsync({});
      const newTask: Task = {
        id: `${Date.now()}`,
        title: title.trim(),
        completed: false,
        photoUri,
        location: {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        },
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      const updated = [newTask, ...tasks];
      setTasks(updated);
      await persistTasks(updated);
      setTitle("");
      setPhotoUri(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No pudimos guardar la tarea, intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

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

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
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
          Ubicación: {item.location.latitude.toFixed(5)},{' '}
          {item.location.longitude.toFixed(5)}
        </Text>
      ) : null}
      <Image source={{ uri: item.photoUri }} style={styles.taskImage} />
      <View style={styles.taskActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            item.completed && styles.actionButtonCompleted,
          ]}
          onPress={() => handleToggleTask(item.id)}
        >
          <Text style={styles.actionText}>
            {item.completed ? "Marcar pendiente" : "Marcar completada"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteTask(item.id)}
        >
          <Text style={styles.actionText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tareas personales</Text>
      <View style={styles.profileButtonRow}>
        <Button title="Ver perfil" onPress={() => router.push("/profile")} />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.photoPicker} onPress={handleTakePhoto}>
          <Text style={styles.photoPickerText}>{photoUri ? "Volver a tomar foto" : "Tomar foto"}</Text>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <Text style={styles.photoHint}>Pulsa para usar la cámara</Text>
          )}
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <Button
            title={isSaving ? "Guardando..." : "Crear tarea"}
            onPress={handleCreateTask}
            disabled={isSaving}
          />
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tasksListContent}
        style={styles.tasksList}
        renderItem={renderTask}
        ListEmptyComponent={() => (
          <Text style={styles.emptyState}>Sin tareas. Crea una para comenzar.</Text>
        )}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.logoutRow}>
        <Button title="Cerrar sesión" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5fb",
    padding: 24,
    paddingBottom: 0,
  },
  tasksList: {
    flex: 1,
  },
  tasksListContent: {
    paddingBottom: 48,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 18,
    color: "#1f2937",
  },
  profileButtonRow: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  photoPicker: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9ca3af",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  photoPickerText: {
    fontWeight: "600",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  photoHint: {
    color: "#6b7280",
  },
  photoPreview: {
    width: 160,
    height: 120,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonRow: {
    marginTop: 8,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
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
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563eb",
    alignItems: "center",
    marginRight: 8,
  },
  actionButtonCompleted: {
    borderColor: "#047857",
  },
  deleteButton: {
    borderColor: "#dc2626",
    backgroundColor: "#fee2e2",
    marginRight: 0,
  },
  actionText: {
    color: "#1d4ed8",
    fontWeight: "600",
  },
  logoutRow: {
    marginTop: 16,
    marginBottom: 32,
  },
  emptyState: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 24,
    fontSize: 16,
  },
});
