import Text from "@/components/styled/Text";
import View from "@/components/styled/View";

import { DetailQuestion, RatingValue } from "@/definitions/forum.types";

import RatingButton, {
  Bookmark,
  RegisterQuestion,
} from "@/components/RatingButton";
import { memo } from "react";
import { ViewProps } from "react-native";
import useRateQuestion from "@/hooks/forum/useRateQuestion";

type QuestionDetailActionsProps = {
  question: DetailQuestion;
} & ViewProps;

const QuestionDetailActions = ({
  question,
  style,
  ...props
}: QuestionDetailActionsProps) => {
  return (
    <>
      <View style={{ gap: 12, alignItems: "center" }}>
        <RatingActions question={question} />
        <Bookmark question={question} />
        <RegisterQuestion question={question} />
      </View>
    </>
  );
};

const RatingActions = memo(({ question }: { question: DetailQuestion }) => {
  const userRating = question.user_rating;
  const { mutate: rateQuestion } = useRateQuestion(question);

  return (
    <View style={{ alignItems: "center", gap: 8 }}>
      <RatingButton
        onPress={() => {
          if (userRating?.value !== RatingValue.POSITIVE) {
            rateQuestion(RatingValue.POSITIVE);
          }
        }}
        isPressed={userRating?.value == RatingValue.POSITIVE}
        direction="up"
      />
      <Text style={{ fontWeight: "bold" }}>{question.ratings_value}</Text>
      <RatingButton
        onPress={() => {
          if (userRating?.value !== RatingValue.NEGATIVE) {
            rateQuestion(RatingValue.NEGATIVE);
          }
        }}
        isPressed={userRating?.value == RatingValue.NEGATIVE}
        direction="down"
      />
    </View>
  );
});

export default QuestionDetailActions;
