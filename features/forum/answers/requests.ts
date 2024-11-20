import { Answer } from "./types";
import { PaginatedResponse } from "@/types/requests";
import { Axios } from "axios";

export async function getAnswers(client: Axios, params: any = {}) {
  return (
    await client.get<PaginatedResponse<Answer>>(`/forum/answers/`, { params })
  ).data.results;
}
