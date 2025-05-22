import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { SessionProvider } from "@/features/auth/ctx";
import { HOME_PAGE } from "@/constants/routes";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AlertDialogProvider from "@/contexts/AlertDialogContext";
import "@/localazation/i18n";
import { RootSiblingParent } from "react-native-root-siblings";
import PaperThemeProvider from "@features/theme/providers";
import useProfileAutoRefresh from "@features/profile/hooks/useProfileAutoRefresh";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Configure QueryClient with better dev tools options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Useful for debugging
      retry: process.env.NODE_ENV === "production",
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [fontsLoaded] = useFonts({
    Cairo: require("../assets/fonts/Cairo-Regular.ttf"),
    NotoSansArabic: require("../assets/fonts/NotoSansArabic-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  /**
   * ROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOT
   * Add two 'O' letters for each new provider :{}|
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
                    <Stack
                      initialRouteName={HOME_PAGE}
                      screenOptions={{
                        animation: "fade_from_bottom",
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen name="(protected)" />
                      <Stack.Screen name="login" />
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
