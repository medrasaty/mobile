import { Axios } from "axios";
import { ServerSettings } from "./types";

export async function getServerSettings(client: Axios) {
  return (await client.get<ServerSettings>(`/preferences/`)).data;
}

export async function updateServerSettingsRequest(
  client: Axios,
  settings: Partial<ServerSettings>
) {
  return await client.patch<ServerSettings>(`/preferences/`, settings);
}
