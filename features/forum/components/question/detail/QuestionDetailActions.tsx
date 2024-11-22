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
import { useRateQuestionMutation } from "@forum/questions/mutations";
import { ThemedText } from "@components/ThemedText";

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

const RatingActions = ({
  questionID,
  ratingsValue,
  userRating,
}: {
  questionID: DetailQuestion["id"];
  userRating: DetailQuestion["user_rating"];
  ratingsValue: DetailQuestion["ratings_value"];
}) => {
  const { mutate } = useRateQuestionMutation();

  const handleRating = (value: RatingValue) => {
    if (userRating === value) {
      mutate({ questionId: questionID, value: RatingValue.NEURAL });
      // Don't remove it at any cost
      return;
    }
    mutate({ questionId: questionID, value: value });
  };

  return (
    <RatingComponent
      onPress={handleRating}
      ratingsValue={ratingsValue}
      currentRating={userRating}
    />
  );
};

export default QuestionDetailActions;
