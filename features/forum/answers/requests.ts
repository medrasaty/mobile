import { Answer } from "./types";
import { PaginatedResponse } from "@/types/requests";
import { Axios, AxiosRequestConfig } from "axios";
import { answerSchemaType } from "./schema";
import { genFileUploadFromPath } from "@/lib/utils";
import { parse } from "react-native-svg";
import { RatingValue } from "@/types/forum.types";

export async function getAnswers(client: Axios, params: any = {}) {
  return (
    await client.get<PaginatedResponse<Answer>>(`/forum/answers/`, { params })
  ).data.results;
}

/**
 *
 * @param data answer data , must be of type {answerSchemaType}
 * @returns
 */
function parseAnswerData(data: answerSchemaType) {
  const formData = new FormData();
  formData.append("question", data.question);
  formData.append("text", data.text);
  if (data.picture)
    formData.append("picture", genFileUploadFromPath(data.picture));

  return formData;
}

/**
 * update or create answer based on answerId,
 * if answerId exist, update , otherwise create.
 * @param c api cliet: Axios
 * @param data answer data
 */
export async function mutateAnswer(
  c: Axios,
  data: answerSchemaType,
  answerId?: Answer["id"] | undefined
) {
  const formData = parseAnswerData(data);
  const config = {
    url: `/forum/answers/${answerId ? `${answerId}/` : ""}`,
    method: answerId ? "patch" : "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data, headers) => {
      return formData;
    },
  } as AxiosRequestConfig;

  const res = await c.request(config);
  return res.data;
}

export async function RateAnswer(
  client: Axios,
  answer: Answer,
  value: RatingValue
) {
  const data = { value: value };
  return await client.post(`/forum/answers/${answer.id}/rate/`, data);
}
