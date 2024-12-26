import { Axios } from "axios";
import { ServerSettings } from "./types";

const BASE_SETTING_URL = "/preferences/";

export async function getServerSettings(client: Axios) {
  return (await client.get<ServerSettings>(BASE_SETTING_URL)).data;
}

export async function updateServerSettingsRequest(
  client: Axios,
  settings: Partial<ServerSettings>
) {
  return await client.patch<ServerSettings>(BASE_SETTING_URL, settings);
}
