import LoadingDialog from "@/components/LoadingDialog";
import { LOGIN_PAGE } from "@/constants/routes";
import { AnimatedAppBarProvider } from "@/contexts";
import { AppBar } from "@/features/navigation/components/AppBar";
import usePushNotificationFeature from "@/features/notifications/hooks/usePushNotificationFeature";
import { useSession } from "@/hooks/useSession";
import { Redirect, Stack } from "expo-router";
import { t } from "i18next";

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
            // you can only customize the title of Appbar
            return <AppBar title={props.options.headerTitle} {...props} />;
          },
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="questions/details/[questionId]" />
        <Stack.Screen
          name="questions/new"
          options={{ headerShown: true, headerTitle: t("new_question") }}
        />
        <Stack.Screen
          name="questions/edit"
          options={{ headerShown: true, headerTitle: t("edit_question") }}
        />
        <Stack.Screen name="users/[username]" />
        <Stack.Screen
          name="search"
          options={{
            headerShown: true,
            headerTitle: t("result"),
          }}
        />
        <Stack.Screen name="schools/[schoolId]" />
        <Stack.Screen
          name="answers/new"
          options={{ headerShown: true, headerTitle: t("new_answer") }}
        />
        <Stack.Screen
          name="answers/edit"
          options={{ headerShown: true, headerTitle: t("edit_answer") }}
        />
      </Stack>
    </AnimatedAppBarProvider>
  );
}
