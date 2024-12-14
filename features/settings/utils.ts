import { ClientSettings } from "./types";

export function parseClientSettings(settings: string): ClientSettings {
  return JSON.parse(settings) as ClientSettings;
}
