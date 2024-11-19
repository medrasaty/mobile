import { Axios } from "axios";

export async function getPreferences(client: Axios) {
  return (await client.get(`/preferecnes/`)).data;
}
