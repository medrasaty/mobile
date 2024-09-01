import { Container } from "@/components/styled";
import { Answer } from "@/types/forum.types";
import { View } from "react-native";
import { AnswerProvider } from "../../contexts/AnswerContext";
import { QUESTION_LAYOUT_GAP } from "@/features/forum/components/question/detail/QuestionDetail";
import Actions from "./AnswerActions";
import Info from "./AnswerInfo";
import useAnswerView from "@/features/forum/hooks/useAnswerView";
import { ThemedText } from "@/components/ThemedText";

export default function AnswerCard({ answer }: { answer: Answer }) {
  const margins = 15;
  useAnswerView(answer.id);
  return (
    <Container style={{ marginBottom: margins, marginTop: margins }}>
      <View>
        <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
          <Actions answer={answer} />
          <Info answer={answer} />
        </View>
      </View>
    </Container>
  );
}
