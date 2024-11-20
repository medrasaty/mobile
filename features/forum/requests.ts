import { Question } from "@/types/forum.types";
import { PaginatedResponse } from "@/types/requests";
import { Axios } from "axios";

export async function getForumQuestions(client: Axios, params?: any) {
  console.log(params);

  const res = await client.get<PaginatedResponse<Question>>(
    `/forum/questions/`,
    { params }
  );
  return res.data.results;
}
