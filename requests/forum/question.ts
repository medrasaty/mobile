import { Question, Rating, RatingValue } from "@/types/forum.types";
import { Axios } from "axios";

export async function rateQuestion(
  question: Question,
  ratingValue: RatingValue,
  client: Axios
): Promise<Rating> {
  // if user has rated the question, update the rating,
  // otherwise, create a new rating

  return await client.post(`/forum/questions/${question.id}/rate/`, {
    value: ratingValue,
  });
}
