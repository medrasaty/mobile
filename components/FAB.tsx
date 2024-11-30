import { router } from "expo-router";
import React, { useState } from "react";
import { FAB, AnimatedFAB, FABProps, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export function AddQuestionFAB() {
  return (
    <FAB
      icon="plus"
      variant="primary"
      onPress={() => router.push("questions/new/index")}
      style={styles.FABStyles}
    />
  );
}

export function NewQuestionFAB() {
  function handlePress() {
    router.push("/questions/new");
  }

  return (
    <FAB
      icon="plus"
      variant="surface"
      onPress={handlePress}
      style={[styles.FABStyles]}
    />
  );
}

const styles = StyleSheet.create({
  FABStyles: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
