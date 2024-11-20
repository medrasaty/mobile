import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { UserProfile } from "./types";
import { Answer, Question } from "@/types/forum.types";
import { transformDates } from "../forum/utils";
import { SortingOption } from "./types.types";
import { questionOrderKeys } from "./hooks/useProfileQuestions";

export async function getProfile(
  client: Axios,
  username: BaseUser["username"]
): Promise<UserProfile> {
  const response = await client.get<UserProfile>(`/users/${username}/`);
  return response.data;
}

export async function getUserQuestions(
  client: Axios,
  username: BaseUser["username"]
): Promise<Question[]> {
  const response = await client.get("/forum/questions/", {
    params: {
      owner: username,
      extend: "subject",
    },
  });

  return response.data.results.map(transformDates);
}

export async function getUserAnswers(
  client: Axios,
  username: BaseUser["username"]
): Promise<Answer[]> {
  const response = await client.get("/forum/answers/", {
    params: {
      owner: username,
    },
  });

  return response.data.results.map(transformDates);
}
