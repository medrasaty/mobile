import { ThemeType } from "@features/theme/types";

export type Language = "en" | "ar";

export interface SettingsType {
  display_email: boolean;
  display_full_name: boolean;
  display_gender: boolean;
  language: Language;
  push_notification: boolean;
  theme: ThemeType;
}
