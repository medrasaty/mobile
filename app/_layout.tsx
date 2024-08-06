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
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// inforce Right to Left layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorscheme = useColorScheme();
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
    NotoSansArabic: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <StatusBar style="auto" />
                <Stack
                  initialRouteName="login"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="(protected)" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="index" />
                </Stack>
              </SafeAreaProvider>
            </PaperProvider>
          </SessionProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
