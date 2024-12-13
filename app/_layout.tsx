import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { SessionProvider } from "@/features/auth/ctx";
import { HOME_PAGE } from "@/constants/routes";
import { Darktheme, LightTheme } from "@/constants/theme";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AlertDialogProvider from "@/contexts/AlertDialogContext";
import "@/localazation/i18n";
import { RootSiblingParent } from "react-native-root-siblings";
import { DarkColors, LightColors } from "@/features/theme/colors";
import PaperThemeProvider from "@features/theme/providers";
import { useSettingsStore } from "@features/settings/store";
import { useStorageState } from "@/hooks/useStorageState";
import { useLoadSettingsAsync } from "@features/settings/hooks";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [fontsLoaded] = useFonts({
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
    NotoSansArabic: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
  });

  const [settingsLoaded] = useLoadSettingsAsync();

  useEffect(() => {
    if (fontsLoaded && settingsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  /** the main purpose of root layout is to show login screen if not logged in
   * and the main application if the user is logged in, and also loading state ( fonts, settings, authstate, etc),
   */
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <PaperThemeProvider>
            <RootSiblingParent>
              <BottomSheetModalProvider>
                <SafeAreaProvider>
                  <AlertDialogProvider>
                    <StatusBar style="auto" />
                    <Stack
                      initialRouteName={HOME_PAGE}
                      screenOptions={{ headerShown: false }}
                    >
                      <Stack.Screen name={HOME_PAGE} />
                      <Stack.Screen name="login" />
                      <Stack.Screen name="index" />
                    </Stack>
                  </AlertDialogProvider>
                </SafeAreaProvider>
              </BottomSheetModalProvider>
            </RootSiblingParent>
          </PaperThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
