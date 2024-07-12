import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { I18nManager, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { Darktheme, LightTheme } from "@/constants/theme";
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
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto"/>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },

            headerTitleStyle: {
              color: theme.colors.onSurface,
            },
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "مرحباَ",
            }}
          />
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
