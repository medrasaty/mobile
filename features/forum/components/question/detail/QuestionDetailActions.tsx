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
import RatingComponent from "../../Rating";

export const ACTIONS_GAP = 12;

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
      <View style={{ gap: ACTIONS_GAP, alignItems: "center" }}>
        <RatingActions question={question} />
        <BookmarkQuestion question={question} />
        <RegisterQuestion question={question} />
      </View>
    </>
  );
};

const RatingActions = memo(({ question }: { question: DetailQuestion }) => {
  const { mutate: rateQuestion } = useQuestionRatingMutation(question);

  const handlePositivePressed = () => {
    // check if previous ratings is positive ( delete it )
    if (question.user_rating === RatingValue.POSITIVE) {
      rateQuestion(RatingValue.NEURAL);
    }
    rateQuestion(RatingValue.POSITIVE);
  };

  const handleNegativePressed = () => {
    if (question.user_rating === RatingValue.NEGATIVE) {
      rateQuestion(RatingValue.NEURAL);
    }
    rateQuestion(RatingValue.NEGATIVE);
  };

  return (
    <RatingComponent
      ratingsValue={question.ratings_value}
      currentRating={question.user_rating}
      onPositivePressed={handlePositivePressed}
      onNegativePressed={handleNegativePressed}
    />
  );
});

export default QuestionDetailActions;
