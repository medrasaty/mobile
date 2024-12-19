import { ThemeType } from "@features/theme/types";

export type Language = "en" | "ar";

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

export interface SettingsType extends ClientSettings, ServerSettings {}
