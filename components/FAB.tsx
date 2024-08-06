import { router } from "expo-router";
import React, { useState } from "react";
import { FAB, AnimatedFAB } from "react-native-paper";

export function AddQuestionFAB() {
  return (
    <FAB
      icon="plus"
      onPress={() => router.push("questions/new/index")}
      style={{
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
      }}
    />
  );
}

type AddQuestionAnimatedFABProps = {
  isExtended: boolean;
};

export function AddQuestionAnimatedFAB({
  isExtended,
}: AddQuestionAnimatedFABProps) {
  function handlePress() {
    router.push("/questions/new");
  }

  return (
    <AnimatedFAB
      icon="plus"
      variant="secondary"
      label="سؤال جديد"
      extended={isExtended}
      iconMode="dynamic"
      onPress={handlePress}
      style={{
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
      }}
    />
  );
}
