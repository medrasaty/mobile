import Text from "@/components/styled/Text";
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

type QuestionDetailActionsProps = {
  questionID: DetailQuestion["id"];
  userRating: DetailQuestion["user_rating"];
  ratingsValue: DetailQuestion["ratings_value"];
  isBookmarked: DetailQuestion["is_bookmarked"];
  isRegistered: DetailQuestion["is_registered"];
} & ViewProps;

const QuestionDetailActions = ({
  questionID,
  userRating,
  ratingsValue,
  isBookmarked,
  isRegistered,
  style,
  ...props
}: QuestionDetailActionsProps) => {
  return (
    <>
      <View style={{ gap: ACTIONS_GAP, alignItems: "center" }} {...props}>
        <RatingActions
          questionID={questionID}
          userRating={userRating}
          ratingsValue={ratingsValue}
        />
        <BookmarkQuestion questionID={questionID} isBookmarked={isBookmarked} />
        <RegisterQuestion questionID={questionID} isRegistered={isRegistered} />
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
