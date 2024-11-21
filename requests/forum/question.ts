import { Question, Rating, RatingValue } from "@/types/forum.types";
import { Axios } from "axios";

export type rateQuestionData = {
  questionId: Question["id"];
  value: RatingValue;
};

export async function rateQuestion(
  client: Axios,
  data: rateQuestionData
): Promise<Rating> {
  // if user has rated the question, update the rating,
  // otherwise, create a new rating
  //
  //
  console.log("rate question");

  return await client.post(`/forum/questions/${data.questionId}/rate/`, {
    value: data.value,
  });
}
