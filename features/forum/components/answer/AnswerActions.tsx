import { useSheetViewRef } from "@/components/SheetView";
import { ThemedView } from "@/components/ThemedView";
import { Answer, RatingValue } from "@/types/forum.types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import useAnswerRatingMutation from "../../hooks/useAnswerRatingMutation";
import Bookmark from "../Bookmark";
import { ReplyIcon } from "../Icons";
import { ACTIONS_GAP } from "../question/detail/QuestionDetailActions";
import Rating from "../Rating";
import ReplySheet from "../reply/ReplySheet";

const Actions = ({ answer }: { answer: Answer }) => {
  return (
    <ThemedView style={{ alignItems: "center", gap: ACTIONS_GAP }}>
      <RatingActions answer={answer} />
      <BookmarkAnswer answer={answer} />
      <Reply answer={answer} />
    </ThemedView>
  );
};

const RatingActions = ({ answer }: { answer: Answer }) => {
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

export const BookmarkAnswer = ({ answer }: { answer: Answer }) => {
  return <Bookmark isBookmarked={false} onPress={() => {}} />;
};
/**
 *
 * @param param0 answer
 * @returns
 */

const useOpenReplySheetEffect = ({
  answer,
  sheetRef,
}: {
  answer: Answer;
  sheetRef: React.RefObject<BottomSheetModal>;
}) => {
  const params = useLocalSearchParams<{
    answerId?: string;
    replyId?: string;
  }>();
  const [hasOpendReplySheet, setHasOpendReplySheet] = useState(false);

  useEffect(() => {
    if (
      params.answerId === answer.id &&
      params.replyId &&
      !hasOpendReplySheet
    ) {
      sheetRef.current?.present();
      setHasOpendReplySheet(true);
    }
  }, [params]);

  return;
};

export const Reply = ({ answer }: { answer: Answer }) => {
  const sheetRef = useSheetViewRef();
  const show = () => sheetRef.current?.present();
  useOpenReplySheetEffect({ answer, sheetRef });

  return (
    <>
      <ReplyIcon onPress={show} repliesCount={answer.replies_count} />
      <ReplySheet answer={answer} ref={sheetRef} />
    </>
  );
};

export default Actions;
