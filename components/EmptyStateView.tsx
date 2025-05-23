import React, { memo, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export type EmptyStateViewProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
  isError?: boolean;
};

/**
 * A reusable component for displaying empty states, no results, or errors
 * Optimized to prevent unnecessary re-renders and calculations.
 */
const EmptyStateView = memo(
  ({
    iconName,
    title,
    subtitle,
    buttonText,
    onButtonPress,
    style,
    isError = false,
  }: EmptyStateViewProps) => {
    const theme = useTheme();

    // Memoize background and icon color to avoid recalculation on every render
    const { backgroundColor, iconColor } = useMemo(
      () => ({
        backgroundColor: isError
          ? theme.colors.errorContainer
          : theme.colors.surfaceVariant,
        iconColor: isError ? theme.colors.error : theme.colors.onSurfaceVariant,
      }),
      [
        isError,
        theme.colors.errorContainer,
        theme.colors.surfaceVariant,
        theme.colors.error,
        theme.colors.onSurfaceVariant,
      ]
    );

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.iconContainer, { backgroundColor }]}>
          <Ionicons name={iconName} size={40} color={iconColor} />
        </View>
        <ThemedText variant="titleMedium" style={styles.title}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText variant="bodyMedium" style={styles.subtitle}>
            {subtitle}
          </ThemedText>
        ) : null}
        {buttonText && onButtonPress ? (
          <Button
            mode="contained"
            onPress={onButtonPress}
            style={styles.button}
          >
            {buttonText}
          </Button>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
    maxWidth: "80%",
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
});

export default EmptyStateView;

