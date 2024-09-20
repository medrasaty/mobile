import { Container } from "@/components/styled";
import { QUESTION_LAYOUT_GAP } from "@/features/forum/components/question/detail/QuestionDetail";
import useAnswerView from "@/features/forum/hooks/useAnswerView";
import { Answer } from "@/types/forum.types";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Actions from "./AnswerActions";
import Info from "./AnswerInfo";
import { containerPaddings } from "@/constants/styels";

function useHighlightAnswerAnimatedStyle(answerId: Answer["id"]) {
  const params = useLocalSearchParams<{ answerId?: string }>();
  const theme = useTheme();
  const backgroundColor = useSharedValue(
    params.answerId === answerId
      ? theme.colors.surfaceVariant
      : theme.colors.surface
  );

  useEffect(() => {
    backgroundColor.value = withTiming(theme.colors.surface, {
      duration: 3500,
    });
  }, [params.answerId]);

  return useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));
}

export default function AnswerCard({ answer }: { answer: Answer }) {
  useAnswerView(answer.id);
  const highlightAnimatedStyle = useHighlightAnswerAnimatedStyle(answer.id);

  return (
    <Animated.View style={[highlightAnimatedStyle, styles.container]}>
      <View>
        <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
          <Actions answer={answer} />
          <Info answer={answer} />
        </View>
      </View>
    </Animated.View>
  );
}

const paddings = 15;
const styles = StyleSheet.create({
  container: {
    paddingTop: paddings,
    paddingBottom: paddings,
    ...containerPaddings,
  },
});
