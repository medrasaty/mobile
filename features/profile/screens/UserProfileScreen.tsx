import Page from "@/components/Page";
import { AppBar } from "@/features/navigation/components/AppBar";
import { Question } from "@/types/forum.types";
import MultiQueryScreenList from "@components/MultiQueryScreenList";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewProps } from "react-native";
import { Divider } from "react-native-paper";
import ProfileHeader from "../components/Profile";
import useProfile from "../hooks/useProfile";
import useUserQuestions from "../queries";
import ErrorView from "@/components/ErrorView";

/**
 * Props for the UserProfileScreen component
 * @typedef UserProfileScreenProps
 * @property {number} id - The user ID to display
 */
type UserProfileScreenProps = { 
  id: number; 
} & ViewProps;

/**
 * UserProfileScreen - Displays another user's profile and their questions
 * 
 * @param {UserProfileScreenProps} props - Component props
 * @returns {React.ReactElement} A screen component with the user's profile information
 */
const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ id, ...props }: UserProfileScreenProps) => {
  const profileQ = useProfile(id);
  const questionsQ = useUserQuestions(id);

  // Handle error states
  const hasError = useMemo(() => 
    profileQ.error || questionsQ.error, 
    [profileQ.error, questionsQ.error]
  );

  // Memoized header component
  const renderHeader = useCallback((): React.ReactNode => {
    if (profileQ.data) {
      return (
        <View style={styles.headerContainer}>
          <ProfileHeader profile={profileQ.data} />
          <Divider bold style={styles.divider} />
        </View>
      );
    }
    return null;
  }, [profileQ.data]);

  // Memoized item renderer
  const renderItem = useCallback(
    ({ item }: { item: Question; index: number }) => (
      <ForumQuestionCard question={item} />
    ),
    []
  );

  // Handle error state
  if (hasError) {
    return (
      <ErrorView 
        onRetry={() => {
          profileQ.refetch();
          questionsQ.refetch();
        }}
        error={profileQ.error || questionsQ.error}
      />
    );
  }

  return (
    <Page {...props}>
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

/**
 * ProfileAppbar - Displays the app bar for a user profile
 * 
 * @param {Object} props - Component props
 * @param {number | undefined} props.userId - The user ID to display in the title
 * @returns {React.ReactElement} An AppBar component with the user's name
 */
export const ProfileAppbar: React.FC<{ userId: number | undefined }> = React.memo(
  ({ userId }) => {
    const { t } = useTranslation();
    return <AppBar divider title={t("username", { username: userId })} />;
  }
);

// Extract styles to StyleSheet for better performance and maintainability
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
  },
  divider: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default React.memo(UserProfileScreen);
