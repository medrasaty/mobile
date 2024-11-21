import View from "@/components/styled/View";
import QuestionDetailActions from "@/features/forum/components/question/detail/QuestionDetailActions";
import QuestionDetailInfo from "@/features/forum/components/question/detail/QuestionDetailInfo";
import { DetailQuestion } from "@/types/forum.types";
import QuestionDetailOwner from "./Owner";
import {
  useQuestionActionPropsMemo,
  useQuestionInfoPropsMemo,
} from "@/features/forum/hooks/useQuestionInfoMemo";

export const QUESTION_LAYOUT_GAP = 16;

export const QuestionDetail = ({ question }: { question: DetailQuestion }) => {
  const infoProps = useQuestionInfoPropsMemo(question);

  return (
    <View style={{ gap: 20, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
        <QuestionDetailActions question={question} />
        <QuestionDetailInfo {...infoProps} />
      </View>
      <QuestionDetailOwner owner={question.owner} />
    </View>
  );
};

export default QuestionDetail;
