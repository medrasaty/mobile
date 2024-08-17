import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { AnimatedAppBarProvider } from "@/contexts";
import { AppBar } from "@/features/navigation/components/AppBar";
import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import * as React from "react";

export default function ProtectedLayout() {
  const { session, isLoading } = useSession();

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
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => <AppBar title="الرئيسية" />,
          }}
          name="questions/details/[questionId]"
        />
        <Stack.Screen
          name="questions/new"
          options={{
            headerShown: true,
            title: "solo",
          }}
        />
      </Stack>
    </AnimatedAppBarProvider>
  );
}
