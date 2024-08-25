import { RatingValue } from "@/types/forum.types";
import { useAnswer } from "../../contexts/AnswerContext";
import useAnswerRatingMutation from "../../hooks/useAnswerRatingMutation";
import Rating from "../Rating";
import { BookmarkQuestion } from "../RatingButton";
import { ThemedView } from "@/components/ThemedView";

const Actions = () => {
  return (
    <ThemedView style={{ alignItems: "center", gap: 8 }}>
      <RatingActions />
      <BookmarkQuestion question={{}} />
    </ThemedView>
  );
};

const RatingActions = () => {
  const answer = useAnswer();
  const { user_rating } = answer;
  const { mutate } = useAnswerRatingMutation(answer);

  const isPositivePressed = user_rating === RatingValue.POSITIVE;
  const isNegativePressed = user_rating === RatingValue.NEGATIVE;
  const { POSITIVE, NEGATIVE, NEURAL } = RatingValue;

  const handlePositivePressed = () => {
    const value = isPositivePressed ? NEURAL : POSITIVE;
    return mutate(value);
  };

  const handleNegativePressed = () => {
    const value = isNegativePressed ? NEURAL : NEGATIVE;
    return mutate(value);
  };

  return (
    <Rating
      ratingsValue={answer.ratings_value}
      onPositivePressed={handlePositivePressed}
      onNegativePressed={handleNegativePressed}
      currentRating={answer.user_rating}
    />
  );
};

export default Actions;
