import { Question, Rating, RatingValue } from "@/definitions/forum.types";
import { Axios } from "axios";

export async function rateQuestion(
  questionId: Question["id"],
  ratingId: Rating["id"] | undefined,
  ratingValue: RatingValue,
  client: Axios
): Promise<Rating> {
  // if user has rated the question, update the rating,
  // otherwise, create a new rating

  let response;

  if (ratingId) {
    response = await client.patch(`/forum/question_ratings/${ratingId}/`, {
      value: ratingValue,
    });
  } else {
    response = await client.post(`/forum/question_ratings/`, {
      question: questionId,
      value: ratingValue,
    });
  }

  return response.data;
}
