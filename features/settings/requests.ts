import { Axios } from "axios";
import { ServerSettings } from "./types";

export async function getPreferences(client: Axios) {
  return (await client.get<ServerSettings>(`/preferecnes/`)).data;
}
