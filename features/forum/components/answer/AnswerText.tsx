import { Answer } from "@/types/forum.types";
import ReadMoreText from "@/components/ReadMoreText";

export default function AnswerText({
  defaultText,
}: {
  defaultText: Answer["text"];
}) {
  return <ReadMoreText text={defaultText} />;
}
