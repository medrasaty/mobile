import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { AnimatedAppBarProvider } from "@/contexts";
import { AppBar } from "@/features/navigation/components/AppBar";
import usePushNotificationFeature from "@/features/notifications/hooks/usePushNotificationFeature";
import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import * as React from "react";

export default function ProtectedLayout() {
  const { session, isLoading } = useSession();
  usePushNotificationFeature();

  if (isLoading) {
    return <LoadingDialog visible={isLoading} />;
  }

  // Redirect to login page if not logged in.
  if (session === null) {
    return <Redirect href={LOGIN_PAGE} />;
  }
  return (
    <AnimatedAppBarProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          header: (props) => {
            // you can customize only the title of Appbar
            return <AppBar title={props.options.headerTitle} {...props} />;
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="questions/details/[questionId]" />
        <Stack.Screen name="questions/new" />
        <Stack.Screen name="users/[username]" />
      </Stack>
    </AnimatedAppBarProvider>
  );
}
