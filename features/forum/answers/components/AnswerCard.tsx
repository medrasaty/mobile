import { QUESTION_LAYOUT_GAP } from "@/features/forum/components/question/detail/QuestionDetail";
import useAnswerView from "@/features/forum/hooks/useAnswerView";
import { Answer } from "@forum/answers/types";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Actions from "./AnswerActions";
import Info from "./AnswerInfo";
import { containerPaddings } from "@/constants/styels";
import { ThemedView } from "@/components/ThemedView";
import useHighlightAnswerAnimatedStyle from "@/features/forum/hooks/useHighlightAnswerAnimatedStyle";

export default function AnswerCard({ answer }: { answer: Answer }) {
  useAnswerView(answer.id);
  const highlightAnimatedStyle = useHighlightAnswerAnimatedStyle(answer.id);

  return (
    <Animated.View style={[styles.container]}>
      <ThemedView>
        <ThemedView style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
          <Actions answer={answer} />
          <Info answer={answer} />
        </ThemedView>
      </ThemedView>
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
