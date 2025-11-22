import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TaskFormProps {
  title: string;
  setTitle: (text: string) => void;
  photoUri: string | null;
  handleTakePhoto: () => void;
  isSaving: boolean;
  handleCreateTask: () => void;
}

export function TaskForm({
  title,
  setTitle,
  photoUri,
  handleTakePhoto,
  isSaving,
  handleCreateTask,
}: TaskFormProps) {

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Título del libro"
        placeholderTextColor="#6b7280"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.photoPicker} onPress={handleTakePhoto}>
        <Text style={styles.photoPickerText}>
          {photoUri ? "Volver a tomar foto" : "Toma una foto a la portada del libro"}
        </Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <Text style={styles.photoHint}>Pulsa para usar la cámara</Text>
        )}
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <Button
          title={isSaving ? "Guardando..." : "Guardar"}
          onPress={handleCreateTask}
          disabled={isSaving}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    minHeight: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#1f2937",
  },
  photoPicker: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9ca3af",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    minHeight: 300,
    justifyContent: "center",
  },
  photoPickerText: {
    fontWeight: "600",
    color: "#1d4ed8",
    marginBottom: 8,
    textAlign: "center",
  },
  photoHint: {
    color: "#6b7280",
  },
  photoPreview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },
  buttonRow: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#92c146ff',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
});
