import Text from "@/components/styled/Text";
import View from "@/components/styled/View";

import { DetailQuestion, RatingValue } from "@/types/forum.types";

import RatingButton, {
  BookmarkQuestion,
  RegisterQuestion,
} from "@/features/forum/components/RatingButton";
import useQuestionRatingMutation from "@/features/forum/hooks/useQuestionRatingMutation";
import { memo } from "react";
import { ViewProps } from "react-native";

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
        <BookmarkQuestion question={question} />
        <RegisterQuestion question={question} />
      </View>
    </>
  );
};

const RatingActions = memo(({ question }: { question: DetailQuestion }) => {
  const userRating = question.user_rating;
  const { mutate: rateQuestion } = useQuestionRatingMutation(question);

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
