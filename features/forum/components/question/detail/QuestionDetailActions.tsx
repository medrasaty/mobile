import View from "@/components/styled/View";

import { DetailQuestion, RatingValue } from "@/types/forum.types";

import {
  BookmarkQuestion,
  RegisterQuestion,
} from "@/features/forum/components/RatingButton";

import useQuestionRatingMutation from "@/features/forum/hooks/useQuestionRatingMutation";
import { memo } from "react";
import { ViewProps } from "react-native";
import RatingComponent from "../../Rating";

export const ACTIONS_GAP = 12;

type QuestionDetailActionsProps = { question: DetailQuestion } & ViewProps;

const QuestionDetailActions = ({
  question,
  style,
  ...props
}: QuestionDetailActionsProps) => {
  return (
    <>
      <View
        style={[style, { gap: ACTIONS_GAP, alignItems: "center" }]}
        {...props}
      >
        <RatingActions
          questionID={question.id}
          userRating={question.user_rating}
          ratingsValue={question.ratings_value}
        />
        <BookmarkQuestion
          questionID={question.id}
          isBookmarked={question.is_bookmarked}
        />
        <RegisterQuestion
          questionID={question.id}
          isRegistered={question.is_registered}
        />
      </View>
    </>
  );
};

const RatingActions = memo(
  ({
    questionID,
    ratingsValue,
    userRating,
  }: {
    questionID: DetailQuestion["id"];
    userRating: DetailQuestion["user_rating"];
    ratingsValue: DetailQuestion["ratings_value"];
  }) => {
    const { mutate: rateQuestion } = useQuestionRatingMutation(questionID);

    const handlePositivePressed = () => {
      // check if previous ratings is positive ( delete it )
      if (userRating === RatingValue.POSITIVE) {
        rateQuestion(RatingValue.NEURAL);
      }
      rateQuestion(RatingValue.POSITIVE);
    };

    const handleNegativePressed = () => {
      if (userRating === RatingValue.NEGATIVE) {
        rateQuestion(RatingValue.NEURAL);
      }
      rateQuestion(RatingValue.NEGATIVE);
    };

    return (
      <RatingComponent
        ratingsValue={ratingsValue}
        currentRating={userRating}
        onPositivePressed={handlePositivePressed}
        onNegativePressed={handleNegativePressed}
      />
    );
  }
);

export default QuestionDetailActions;
