import { ThemeType } from "@features/theme/types";

export type Language = "en" | "ar";

/** @deprecated */
export interface SettingsType {}

export interface ClientSettings {
  theme: ThemeType;
  language: Language;
}

export interface ServerSettings {
  display_email: boolean;
  display_full_name: boolean;
  display_gender: boolean;
  push_notification: boolean;
}
