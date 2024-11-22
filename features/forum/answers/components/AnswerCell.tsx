import { Answer } from "@/types/forum.types";
import { ViewProps } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const AnswerCell = ({ answer, ...props }: { answer: Answer } & ViewProps) => {
  return <ThemedText {...props}>{answer.text}</ThemedText>;
};

export default AnswerCell;
