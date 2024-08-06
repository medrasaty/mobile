import { containerPaddings } from "@/constants/styels";
import { Answer } from "@/definitions/forum.types";
import { Card } from "react-native-paper";

export default function AnswerCard({ answer }: { answer: Answer }) {
  return (
    <Card style={[containerPaddings, { borderRadius: 0, margin: 10 }]}>
      <Card.Title title={answer.text} />
    </Card>
  );
}
