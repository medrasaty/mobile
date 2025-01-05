import Page from "@/components/Page";
import { AppBar } from "@/features/navigation/components/AppBar";
import { path } from "@/lib/routing";
import { Question } from "@/types/forum.types";
import { BaseUser } from "@/types/user.types";
import MultiQueryScreenList from "@components/MultiQueryScreenList";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import ProfileHeader from "../components/Profile";
import useProfile from "../hooks/useProfile";
import useUserQuestions from "../queries";

type ProfileMainScreenProps = { id: BaseUser["id"] } & ViewProps;

const ProfileMainScreen = ({ id, ...props }: ProfileMainScreenProps) => {
  const profileQ = useProfile(id);
  const questionsQ = useUserQuestions(id);

  const renderHeader = useCallback(() => {
    if (profileQ.data) {
      return (
        <View style={{ marginTop: 10 }}>
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
      <ProfileAppbar userId={profileQ.data?.id} />
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

export const ProfileAppbar = ({ userId }: { userId: string | undefined }) => {
  const router = useRouter();
  const goToContent = useCallback(() => {
    router.push(path.users.content(userId));
  }, [userId]);

  const { t } = useTranslation();
  return (
    <AppBar divider title={t("username", { username: userId })}>
      <Appbar.Action icon="dots-vertical" onPress={goToContent} />
    </AppBar>
  );
};

export default ProfileMainScreen;
