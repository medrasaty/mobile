import { AppBar } from "@/features/navigation/components/AppBar";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewProps, Text } from "react-native";
import ProfileHeader from "../components/Profile";
import useProfile from "../hooks/useProfile";
import useUserQuestions from "../queries";
import ErrorView from "@/components/ErrorView";
import { ScrollView } from "react-native";
import { ServerPage } from "@components/ServerView";
import Page from "@components/Page";

/**
 * Props for the UserProfileScreen component
 */
type UserProfileScreenProps = {
  id: number;
} & ViewProps;

/**
 * UserProfileScreen - Displays another user's profile and their questions
 *
 * @param UserProfileScreenProps props - Component props
 * @returns React.ReactElement A screen component with the user's profile information
 */
const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  id,
  ...props
}: UserProfileScreenProps) => {
  const profileQ = useProfile(id);
  const questionsQ = useUserQuestions(id);

  // Handle error states
  const hasError = useMemo(
    () => profileQ.error || questionsQ.error,
    [profileQ.error, questionsQ.error]
  );

  // Handle error state
  if (hasError) {
    return (
      <Page>
        <ErrorView
          onRetry={() => {
            profileQ.refetch();
            questionsQ.refetch();
          }}
          error={profileQ.error || questionsQ.error}
        />
      </Page>
    );
  }

  // Return to a more traditional approach but with key optimization
  return (
    <ServerPage status={profileQ.status} {...props}>
      <ProfileAppbar userId={profileQ.data?.id} />
      <ScrollView>
        {/* Add a stable key for the header to optimize React's reconciliation */}
        {profileQ.data ? (
          <View style={styles.headerContainer}>
            <ProfileHeader key={`profile-${id}`} profile={profileQ.data} />
            {/* <Divider bold style={styles.divider} /> */}
          </View>
        ) : (
          <View style={styles.headerContainer}>
            <Text>Loading profile...</Text>
          </View>
        )}
      </ScrollView>
    </ServerPage>
  );
};

/**
 * ProfileAppbar - Displays the app bar for a user profile
 *
 * @param {Object} props - Component props
 * @param {number | undefined} props.userId - The user ID to display in the title
 * @returns {React.ReactElement} An AppBar component with the user's name
 */
export const ProfileAppbar: React.FC<{ userId: number | undefined }> =
  React.memo(({ userId }) => {
    const { t } = useTranslation();
    return (
      <AppBar
        divider
        title={userId ? t("username", { username: userId }) : ""}
      />
    );
  });

// Extract styles to StyleSheet for better performance and maintainability
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
  },
  divider: {
    marginBottom: 20,
    marginTop: 20,
  },
  listContent: {
    paddingTop: 0, // No padding needed since header is separate
  },
});

export default React.memo(UserProfileScreen);
