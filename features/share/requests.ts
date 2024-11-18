import { Axios } from "axios";
import { ShareQuestionData } from "./types";

export async function shareQuestion(client: Axios, data: ShareQuestionData) {
  return await client.post(`/share/`, data);
}
