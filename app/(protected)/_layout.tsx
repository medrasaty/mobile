import { LOGIN_PAGE } from "@/constants/routes";
import { AnimatedAppBarProvider } from "@/contexts";
import usePushNotificationFeature from "@/features/notifications/hooks/usePushNotificationFeature";
import { useAuthSession } from "@features/auth/store";
import SearchResultAppbar from "@features/search/components/SearchResultAppbar";
import { Redirect, Stack } from "expo-router";
import { t } from "i18next";
import { Appbar } from "react-native-paper";

export default function ProtectedLayout() {
  const session = useAuthSession((state) => state.session);
  usePushNotificationFeature();

  // Redirect to login page if not logged in.
  if (!session?.token) {
    return <Redirect href={LOGIN_PAGE} />;
  }

  return (
    <AnimatedAppBarProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          header: (props) => {
            // you can only customize the title of Appbar
            return (
              <Appbar.Header>
                <Appbar.Content title={props.options.headerTitle as string} />
              </Appbar.Header> 
            );
          },
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen
          name="questions/new"
          options={{
            headerTitle: t("new_question"),
          }}
        />
        <Stack.Screen
          name="questions/edit"
          options={{ headerShown: true, headerTitle: t("edit_question") }}
        />
        <Stack.Screen name="users/[id]" />
        <Stack.Screen
          name="search"
          options={{
            headerShown: true,
            header: (props) => <SearchResultAppbar />,
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
