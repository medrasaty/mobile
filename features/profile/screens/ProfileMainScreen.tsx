import { View, ViewProps } from "react-native";
import useProfile from "../hooks/useProfile";
import Page from "@/components/Page";
import { useCallback } from "react";
import ProfileHeader from "../components/Profile";
import { Appbar, Divider } from "react-native-paper";
import { AppBar } from "@/features/navigation/components/AppBar";
import { useTranslation } from "react-i18next";
import { Question } from "@/types/forum.types";
import { useRouter } from "expo-router";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import MultiQueryScreenList from "@components/MultiQueryScreenList";
import useUserQuestions from "../queries";

type ProfileMainScreenProps = { username: string } & ViewProps;

const ProfileMainScreen = ({ username, ...props }: ProfileMainScreenProps) => {
  const profileQ = useProfile(username);
  const questionsQ = useUserQuestions(username);

  const renderHeader = useCallback(() => {
    if (profileQ.data) {
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
      return <ForumQuestionCard question={item} />;
    },
    []
  );

  return (
    <Page>
      <ProfileAppbar username={profileQ.data?.username} />
      <MultiQueryScreenList
        headerStatus={profileQ.status}
        dataStatus={questionsQ.status}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        estimatedItemSize={FORUM_QUESTION_CARD_HEIGHT}
        onRetry={profileQ.refetch}
        data={questionsQ.data}
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
    <AppBar title={t("username", { username: username })}>
      <Appbar.Action icon="dots-vertical" onPress={goToContent} />
    </AppBar>
  );
};

export default ProfileMainScreen;
