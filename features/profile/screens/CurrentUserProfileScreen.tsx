import { AppBar } from "@/features/navigation/components/AppBar";
import { Question } from "@/types/forum.types";
import { BaseUser } from "@/types/user.types";
import Page from "@components/Page";
import { useAuthSession } from "@features/auth/store";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";
import { t } from "i18next";
import { useCallback } from "react";
import { View, ViewProps } from "react-native";
import { Divider } from "react-native-paper";
import ProfileHeader from "../components/Profile";
import useProfile from "../hooks/useProfile";
import useUserQuestions from "../queries";

type CurrentUserProfileScreenProps = { id: BaseUser["id"] } & ViewProps;

const CurrentUserProfileScreen = ({
  id,
  ...props
}: CurrentUserProfileScreenProps) => {
  const profileQ = useProfile(id);
  const questionsQ = useUserQuestions(id);
  const session = useAuthSession((state) => state.session);

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
      <AppBar divider backAction={false} title={t("profile")} />
    </Page>
  );
};


export default CurrentUserProfileScreen;