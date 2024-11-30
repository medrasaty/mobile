import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { UserProfile } from "./types";
import { Answer, Question } from "@/types/forum.types";
import { transformDates } from "../forum/utils";
import { SortingOption } from "./types.types";
import { questionOrderKeys } from "./hooks/useProfileQuestions";

export async function getProfile(
  client: Axios,
  pk: BaseUser["pk"]
): Promise<UserProfile> {
  const response = await client.get<UserProfile>(`/users/${pk}/`);
  return response.data;
}

export async function getUserQuestions(
  client: Axios,
  userId: BaseUser["id"]
): Promise<Question[]> {
  const response = await client.get("/forum/questions/", {
    params: {
      owner: userId,
      extend: "subject",
    },
  });

  return response.data.results.map(transformDates);
}

export async function getUserAnswers(
  client: Axios,
  userId: BaseUser["id"]
): Promise<Answer[]> {
  const response = await client.get("/forum/answers/", {
    params: {
      owner: userId,
    },
  });

  return response.data.results.map(transformDates);
}
