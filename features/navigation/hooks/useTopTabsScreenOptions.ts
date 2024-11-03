import { useMemo } from "react";
import { useTheme } from "react-native-paper";

export default function useTopTabsScreenOptions() {
  const theme = useTheme();

  return useMemo(
    () => ({
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarIndicatorStyle: {
        backgroundColor: theme.colors.primary,
      },
      tabBarLabelStyle: {
        fontFamily: "NotoSansArabic",
        fontWeight: "bold",
        fontSize: 16,
      },
    }),
    [theme]
  );
}
