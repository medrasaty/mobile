import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import {
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider,
} from "react-native-paper";

import { CyanDark } from "@/constants/Colors";

// inforce Right to Left layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// only dark theme are supported , light theme are not supported ( yet )
const theme = {
  ...DefaultDarkTheme,
  colors: CyanDark.colors,
  fonts: {
    default: {
      ...DefaultDarkTheme.fonts.default,
      fontFamily: "Cario",
    },
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
    Noto: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  /** the main purpose of root layout is to show login screen if not logged in
   * and the main application if the user is logged in, and also loading fonts,
   * checking internet connectivity and fetching user info from the server.
   */

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontFamily: "Cairo",
            color: theme.colors.onBackground,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "الرئيسية",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
