import { DetailQuestion, Question } from "@/types/forum.types";
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

export async function getForumQuestion(
  client: Axios,
  questionId: Question["id"],
  params?: any
) {
  const res = await client.get<DetailQuestion>(
    `/forum/questions/${questionId}/`
  );
  return res.data;
}

export async function bookmarkQuestion(c: Axios, questionId: Question["id"]) {
  return await c.post(`/forum/questions/${questionId}/bookmark/`);
}

export async function unbookmarkQuestion(c: Axios, questionId: Question["id"]) {
  return await c.delete(`/forum/questions/${questionId}/unbookmark/`);
}

export async function registerQuestion(c: Axios, questionId: Question["id"]) {
  await c.post(`/forum/questions/${questionId}/register/`);
}

export async function unregisterQuestion(c: Axios, questionId: Question["id"]) {
  await c.delete(`/forum/questions/${questionId}/unregister/`);
}
