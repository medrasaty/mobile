import { FAB, Portal } from "react-native-paper";
import { DetailQuestion, Question } from "@/types/forum.types";
import { router } from "expo-router";

export const CREATE_ANSWER_FAB_MARGIN = 30;

export default function CreateAnswer({
  question,
}: {
  question: DetailQuestion;
  questionId: Question["id"] | undefined;
}) {
  const goToCreateAnswer = () => {
    router.push({
      pathname: `/answers/new`,
      params: {
        questionId: question.id,
      },
    });
  };

  return (
    <FAB
      onPress={goToCreateAnswer}
      icon="plus"
      size="medium"
      variant="surface"
      style={{
        position: "absolute",
        margin: CREATE_ANSWER_FAB_MARGIN,
        right: 0,
        bottom: 0,
      }}
    />
  );
}
