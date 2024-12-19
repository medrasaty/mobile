import { ClientSettings, ServerSettings, SettingsType } from "./types";

/**
 * Default settings
 */
export const DEFAULT_SETTINGS = {
  language: "ar",
  theme: "system",
  display_email: false,
  display_full_name: false,
  display_gender: false,
  push_notification: false,
} satisfies SettingsType;
