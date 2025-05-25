import { useSheetViewRef } from "@/components/SheetView";
import { ThemedView } from "@/components/ThemedView";
import { RatingValue } from "@/types/forum.types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAnswerRatingMutation } from "@forum/answers/mutations";
import Bookmark from "@forum/components/Bookmark";
import { ReplyIcon } from "@forum/components/Icons";
import { ACTIONS_GAP } from "@forum/components/question/detail/QuestionDetailActions";
import Rating from "@forum/components/Rating";
import ReplySheet from "@forum/components/reply/ReplySheet";
import { Answer } from "../types";
import { useSheetRef } from "@components/Sheet";
import View from "@components/styled/View";

const Actions = ({ answer }: { answer: Answer }) => {
  return (
    <View style={{ alignItems: "center", gap: ACTIONS_GAP }}>
      <RatingActions answer={answer} />
      <Reply answer={answer} />
    </View>
  );
};

const RatingActions = ({ answer }: { answer: Answer }) => {
  const { user_rating } = answer;
  const { mutate } = useAnswerRatingMutation(answer);

  const { NEURAL } = RatingValue;

  const handleRating = (value: RatingValue) => {
    if (value === user_rating) {
      return mutate(NEURAL);
    }
    return mutate(value);
  };

  return (
    <Rating
      onPress={handleRating}
      ratingsValue={answer.ratings_value}
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
  const sheetRef = useSheetRef();
  const show = () => sheetRef.current?.expand();
  // useOpenReplySheetEffect({ answer, sheetRef });

  return (
    <>
      <ReplyIcon onPress={show} repliesCount={answer.replies_count} />
      <ReplySheet answer={answer} ref={sheetRef} />
    </>
  );
};

export default Actions;
