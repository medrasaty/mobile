import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar"; // Import Arabic locale
import { getLocales } from "expo-localization";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

// Set Arabic as the locale
dayjs.locale(getLocales()[0]["languageCode"] ?? "ar");

export function d(date: Date | string) {
  return dayjs(date);
}
