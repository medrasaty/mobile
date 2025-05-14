import { ThemedView } from "@/components/ThemedView";
import { ACTION_BUTTON_CONTAINER_WIDTH } from "../hooks/useIconProps";
import React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
};

/**
 * A wrapper component that ensures consistent styling for all action buttons
 * Uses a centralized width constant for maintainability
 */
export const ActionButton = ({ children }: ActionButtonProps) => {
  return (
    <ThemedView style={{ width: ACTION_BUTTON_CONTAINER_WIDTH, alignItems: "center" }}>
      {children}
    </ThemedView>
  );
};
