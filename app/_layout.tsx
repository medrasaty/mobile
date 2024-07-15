import { useFonts } from "expo-font";
import { Stack, SplashScreen, Slot } from "expo-router";
import { useEffect } from "react";
import { I18nManager, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { SessionProvider } from "@/auth/ctx";
import { Darktheme, LightTheme } from "@/constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// inforce Right to Left layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorscheme = useColorScheme();

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

  const theme = colorscheme === "dark" ? Darktheme : LightTheme;

  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <Slot initialRouteName="/home" />
          </SafeAreaProvider>
        </PaperProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
