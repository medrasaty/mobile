import { View, ViewProps } from "react-native";
import useProfile from "../hooks/useProfile";
import Page from "@/components/Page";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import { useCallback } from "react";
import useProfileQuestions from "../hooks/useProfileQuestions";
import ProfileHeader from "../components/Profile";
import { Appbar, Divider } from "react-native-paper";
import { AppBar } from "@/features/navigation/components/AppBar";
import { useTranslation } from "react-i18next";
import { Question } from "@/types/forum.types";
import QuestionCard from "@/features/forum/components/question/QuestionCard";
import { useRouter } from "expo-router";

type ProfileMainScreenProps = { username: string } & ViewProps;

const ProfileMainScreen = ({ username, ...props }: ProfileMainScreenProps) => {
  const profileQ = useProfile(username);
  const questionsQ = useProfileQuestions(username);

  const renderHeader = useCallback(() => {
    if (profileQ.isSuccess) {
      return (
        <View>
          <ProfileHeader profile={profileQ.data} />
          <Divider bold style={{ marginBottom: 20, marginTop: 20 }} />
        </View>
      );
    }
  }, [profileQ.data]);

  const renderItem = useCallback(
    ({ item, index }: { item: Question; index: number }) => {
      return <QuestionCard question={item} />;
    },
    []
  );

  return (
    <Page>
      <ProfileAppbar username={profileQ.data?.username} />
      <ScreenListV2
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        estimatedItemSize={200}
        onRetry={profileQ.refetch}
        isPending={profileQ.isPending || questionsQ.isPending}
        isError={profileQ.isError || questionsQ.isError}
        data={questionsQ.data ?? []}
      />
    </Page>
  );
};

export const ProfileAppbar = ({
  username,
}: {
  username: string | undefined;
}) => {
  const router = useRouter();
  const goToContent = useCallback(() => {
    router.push(`/users/${username}/content`);
  }, [username]);
  const { t } = useTranslation();
  return (
    <AppBar title={t("username", (username = username ?? ""))}>
      <Appbar.Action icon="dots-vertical" onPress={goToContent} />
    </AppBar>
  );
};

export default ProfileMainScreen;
