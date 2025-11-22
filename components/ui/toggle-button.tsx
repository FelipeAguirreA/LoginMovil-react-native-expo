import React from "react";
import Button from "./button";

interface ToggleTaskButtonProps {
  completed: boolean;
  onPress: () => void;
}

export function ToggleTaskButton({ completed, onPress }: ToggleTaskButtonProps) {
  return (
    <Button
      text={completed ? "Pendiente" : "Leído"}
      type={completed ? "success" : "outlined"}
      onPress={onPress}
      style={{ flex: 1, marginRight: 8}}
    />
  );
}
