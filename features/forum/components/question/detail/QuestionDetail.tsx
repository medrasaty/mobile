import View, { Container } from "@/components/styled/View";
import QuestionDetailActions from "@/features/forum/components/question/detail/QuestionDetailActions";
import QuestionDetailInfo from "@/features/forum/components/question/detail/QuestionDetailInfo";
import { DetailQuestion } from "@/types/forum.types";
import QuestionDetailOwner from "./Owner";

export const QUESTION_LAYOUT_GAP = 12;

export const QuestionDetail = ({ question }: { question: DetailQuestion }) => {
  return (
    <View style={{ gap: 20, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
        <QuestionDetailActions question={question} />
        <QuestionDetailInfo question={question} />
      </View>
      <QuestionDetailOwner owner={question.owner} />
    </View>
  );
};

export default QuestionDetail;
