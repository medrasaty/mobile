import View from "@/components/styled/View";

import { DetailQuestion, RatingValue } from "@/types/forum.types";

import {
  BookmarkQuestion,
  RegisterQuestion,
} from "@/features/forum/components/RatingButton";

import { ActionButton } from "@/features/forum/components/ActionButton";

import { ViewProps } from "react-native";
import RatingComponent from "../../Rating";
import { useRateQuestionMutation } from "@forum/questions/mutations";

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
        style={[style, { gap: ACTIONS_GAP, alignItems: "flex-start" }]}
        {...props}
      >
        <RatingActions
          questionID={question.id}
          userRating={question.user_rating}
          ratingsValue={question.ratings_value}
        />
        <ActionButton>
          <BookmarkQuestion
            questionID={question.id}
            isBookmarked={question.is_bookmarked}
          />
        </ActionButton>
        <ActionButton>
          <RegisterQuestion
            questionID={question.id}
            isRegistered={question.is_registered}
          />
        </ActionButton>
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
      ratingsValue={ratingsValue ?? 0} //
      currentRating={userRating}
    />
  );
};

export default QuestionDetailActions;
