import { SettingsType } from "./types";

export function parseSettings(settings: string): SettingsType {
  return JSON.parse(settings) as SettingsType;
}
