import { DetailQuestion } from "@/types/forum.types";
import { useMemo } from "react";

export function useQuestionInfoPropsMemo(question: DetailQuestion) {
  return useMemo(
    () => ({
      title: question.title,
      subject: question.subject,
      text: question.text,
      tags: question.tags,
      picture: question.picture,
      views: question.views,
      answersCount: question.answers_count,
      created: question.created,
      modified: question.modified,
    }),
    [
      question.title,
      question.subject,
      question.text,
      question.tags,
      question.picture,
      question.views,
      question.answers_count,
      question.created,
      question.modified,
    ]
  );
}

export function useQuestionActionPropsMemo(question: DetailQuestion) {
  return useMemo(
    () => ({
      questionID: question.id,
      isBookmarked: question.is_bookmarked,
      isRegistered: question.is_registered,
      ratingsValue: question.ratings_value,
      userRating: question.user_rating,
    }),
    [
      question.id,
      question.is_bookmarked,
      question.is_registered,
      question.ratings_value,
      question.user_rating,
    ]
  );
}
