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
) {
  const response = await client.get(`/users/${username}/`);
  return transformProfile(response.data);
}

function transformProfile(profile: UserProfile) {
  return {
    ...profile,
    date_joined: new Date(profile.date_joined),
  };
}

export async function getUserQuestions(
  client: Axios,
  username: BaseUser["username"],
  sort: SortingOption<questionOrderKeys>
): Promise<Question[]> {
  const response = await client.get("/forum/questions/", {
    params: {
      owner: username,
      ordering: sort,
    },
  });

  return response.data.results.map(transformDates);
}

export async function getUserAnswers(
  client: Axios,
  username: BaseUser["username"],
  sortKey: string
): Promise<Answer[]> {
  const response = await client.get("/forum/answers/", {
    params: {
      owner: username,
      ordering: sortKey,
    },
  });

  return response.data.results.map(transformDates);
}
