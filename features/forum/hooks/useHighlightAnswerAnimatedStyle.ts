import { Answer } from "@/types/forum.types";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTheme } from "react-native-paper";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function useHighlightAnswerAnimatedStyle(
  answerId: Answer["id"]
) {
  const params = useLocalSearchParams<{ answerId?: string }>();
  const theme = useTheme();
  const animatedBackgroundColor = useSharedValue(theme.colors.surfaceVariant);
  const defaultBackgroundColor = theme.colors.surface;

  useEffect(() => {
    animatedBackgroundColor.value = withTiming(theme.colors.surface, {
      duration: 3500,
    });
  }, [params.answerId, theme]);

  return useAnimatedStyle(() => ({
    backgroundColor:
      params.answerId === answerId
        ? animatedBackgroundColor.value
        : defaultBackgroundColor,
  }));
}
