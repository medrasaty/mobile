import { ClientSettings, ServerSettings, SettingsType } from "./types";

/**
 * Default values for server side settings.
 */
export const DEFAULT_SERVER_SETTINGS = {
  display_email: false,
  display_full_name: false,
  display_gender: false,
  push_notification: false,
} satisfies ServerSettings;

/**
 * Default settings
 */
export const DEFAULT_SETTINGS = {
  language: "ar",
  theme: "system",
  ...DEFAULT_SERVER_SETTINGS,
} satisfies SettingsType;
