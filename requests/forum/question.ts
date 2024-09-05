import { Question, Rating, RatingValue } from "@/types/forum.types";
import { Axios } from "axios";

export async function rateQuestion(
  questionID: Question["id"],
  ratingValue: RatingValue,
  client: Axios
): Promise<Rating> {
  // if user has rated the question, update the rating,
  // otherwise, create a new rating

  return await client.post(`/forum/questions/${questionID}/rate/`, {
    value: ratingValue,
  });
}
