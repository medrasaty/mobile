import { request } from "@/lib/api";
import { Question } from "@/types/forum.types";
import { PaginatedResponse } from "@/types/requests";
import { Axios } from "axios";

export async function getForumQuestions(client: Axios, params?: any) {
  const response = await request<PaginatedResponse<Question>>({
    url: `/forum/questions/`,
    method: "get",
    params: {
      ...params,
    },
  });
  return response.data.results;
}
