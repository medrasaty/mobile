import { Question } from "@/types/forum.types";
import { Answer } from "@forum/answers/types";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export function useQuestionIdParams() {
  const { questionId } = useLocalSearchParams<{ questionId: Question["id"] }>();

  return questionId;
}

/**
 * Takes list reference and and index item than scroll to that index
 */
function useScrollToAnswer(
  answers: Answer[] | undefined,
  listRef: React.RefObject<FlashList<Answer>>
) {
  const { answerId } = useLocalSearchParams<{ answerId?: string }>();

  const [hasScrolled, setHasScrolled] = useState(false);

  const answerIndex = useMemo(
    () => answers?.findIndex((answer) => answer.id === answerId) ?? -1,
    [answers, answerId]
  );

  useEffect(() => {
    if (
      answerId &&
      answers &&
      answerIndex !== -1 &&
      listRef.current &&
      !hasScrolled
    ) {
      listRef.current.scrollToIndex({
        index: answerIndex,
        animated: true,
        viewPosition: 0,
      });
      setHasScrolled(true);
    }
  }, [answers, answerId, answerIndex, listRef, hasScrolled]);
}
