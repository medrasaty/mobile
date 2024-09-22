import Page from "@/components/Page";
import React, { useEffect, useRef } from "react";

import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "react-native-paper";
const useHighlightAnimatedStyle = () => {
  const theme = useTheme();
  const backgroundColor = useSharedValue(theme.colors.surfaceVariant);

  useEffect(() => {
    backgroundColor.value = withTiming(theme.colors.surface, {
      duration: 2500,
    });
  }, []);

  if (true) {
    return useAnimatedStyle(() => {
      return {
        backgroundColor: backgroundColor.value,
      };
    });
  }
};

export default useHighlightAnimatedStyle;
