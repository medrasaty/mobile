import { QUESTION_LAYOUT_GAP } from "@/features/forum/components/question/detail/QuestionDetail";
import useAnswerView from "@/features/forum/hooks/useAnswerView";
import { Answer } from "@forum/answers/types";
import { StyleSheet } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSequence, 
  withDelay,
  runOnJS
} from "react-native-reanimated";
import Actions from "./AnswerActions";
import Info from "./AnswerInfo";
import { containerPaddings } from "@/constants/styels";
import { ThemedView } from "@/components/ThemedView";
import useStore from "@/store";
import { useEffect, memo, useRef } from "react";
import { useTheme } from "react-native-paper";

// Extracted to avoid creating the same function on every render
const NOOP = () => {};

// Memoize the AnswerCard component to prevent unnecessary re-renders
const AnswerCard = memo(function AnswerCard({ answer, isHighlighted }: { 
  answer: Answer, 
  isHighlighted?: boolean 
}) {
  // Track if animation has been run to avoid duplicate animations
  const animationRunRef = useRef(false);
  
  // Only track view once to avoid unnecessary API calls
  useAnswerView(answer.id);
  const theme = useTheme();
  
  // Set up animation values - only create once per component instance
  const backgroundColor = useSharedValue(0);
  
  // Create animated styles for highlight effect - memoized by Reanimated
  const highlightStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value === 1 
      ? theme.colors.primaryContainer 
      : 'transparent',
  }));
  
  // Trigger highlight animation when isHighlighted changes - with performance optimizations
  useEffect(() => {
    // Skip if already animated or not highlighted
    if (!isHighlighted || animationRunRef.current) return;
    
    // Mark animation as run
    animationRunRef.current = true;
    
    // Start animation sequence
    backgroundColor.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(
        800,
        withSequence(
          withTiming(0, { duration: 400 }),
          withTiming(1, { duration: 300 }),
          withDelay(800, withTiming(0, { duration: 1000 }, () => {
            // Clean up after animation completes
            runOnJS(NOOP)();
          }))
        )
      )
    );
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
