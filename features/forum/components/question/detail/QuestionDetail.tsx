import View from "@/components/styled/View";
import QuestionDetailActions from "@/features/forum/components/question/detail/QuestionDetailActions";
import QuestionDetailInfo from "@/features/forum/components/question/detail/QuestionDetailInfo";
import { DetailQuestion } from "@/types/forum.types";
import { useQuestionInfoPropsMemo } from "@/features/forum/hooks/useQuestionInfoMemo";
import { ThemedText } from "@components/ThemedText";

export const QUESTION_LAYOUT_GAP = 16;

export const QuestionDetail = ({ question }: { question: DetailQuestion }) => {
  return (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
        <QuestionDetailActions question={question} />
        <QuestionDetailInfo question={question} />
      </View>
    </View>
  );
};

export default QuestionDetail;
