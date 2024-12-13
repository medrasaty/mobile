import { SettingsType } from "./types";

export const DEFAULT_SETTINGS = {
  display_email: false,
  display_full_name: false,
  display_gender: false,
  language: "ar",
  push_notification: false,
  theme: "system",
} satisfies SettingsType;
