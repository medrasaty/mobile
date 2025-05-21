import { QUESTION_LAYOUT_GAP } from "@/features/forum/components/question/detail/QuestionDetail";
import useAnswerView from "@/features/forum/hooks/useAnswerView";
import { Answer } from "@forum/answers/types";
import { StyleSheet } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSequence, 
  withDelay 
} from "react-native-reanimated";
import Actions from "./AnswerActions";
import Info from "./AnswerInfo";
import { containerPaddings } from "@/constants/styels";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store";
import { useEffect, memo } from "react";
import { useTheme } from "react-native-paper";

// Memoize the AnswerCard component to prevent unnecessary re-renders
const AnswerCard = memo(function AnswerCard({ answer }: { answer: Answer }) {
  // Only track view once to avoid unnecessary API calls
  useAnswerView(answer.id);
  const theme = useTheme();
  
  // Get highlight status from store
  const isHighlighted = useStore(state => 
    state.highlightedAnswer?.answerId === answer.id
  );
  
  // Set up animation values - only create once per component instance
  const backgroundColor = useSharedValue(0);
  
  // Create animated styles for highlight effect
  const highlightStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value === 1 
        ? theme.colors.primaryContainer 
        : 'transparent',
    };
  });
  
  // Trigger highlight animation when isHighlighted changes
  useEffect(() => {
    if (isHighlighted) {
      // Animate highlight sequence - flash twice and then fade out
      backgroundColor.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(
          800,
          withSequence(
            withTiming(0, { duration: 400 }),
            withTiming(1, { duration: 300 }),
            withDelay(800, withTiming(0, { duration: 1000 }))
          )
        )
      );
    }
  }, [isHighlighted, backgroundColor]);

  return (
    <Animated.View style={[styles.container, highlightStyle]}>
      <ThemedView>
        <ThemedView style={styles.contentLayout}>
          <Actions answer={answer} />
          <Info answer={answer} />
        </ThemedView>
      </ThemedView>
    </Animated.View>
  );
});

const paddings = 15;
const styles = StyleSheet.create({
  container: {
    paddingTop: paddings,
    paddingBottom: paddings,
    ...containerPaddings,
    borderRadius: 8,
  },
  contentLayout: {
    flexDirection: "row", 
    gap: QUESTION_LAYOUT_GAP
  }
});

export default AnswerCard;
