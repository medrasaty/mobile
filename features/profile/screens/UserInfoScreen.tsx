import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppBar } from "@/features/navigation/components/AppBar";
import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";
import { useAuthSession } from "@features/auth/store";
import {
  Card,
  Avatar,
  Chip,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import { useTheme } from "react-native-paper/src/core/theming";
import dayjs from "dayjs";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { Ionicons } from "@expo/vector-icons";
import { AuthUser } from "@features/auth/types";
import Row from "@components/Row";

// Define a type for the user data returned by the API
type UserInfoData = {
  date_joined: string;
  followers_count: number;
  followings_count: number;
  profile_picture: string;
  school_name: string;
};

/**
 * UserInfoScreen - Displays detailed information about the current user
 */
const UserInfoScreen = () => {
  const theme = useTheme();
  // Use type assertion to access additional properties
  const user = useAuthSession((state) => state.session?.user) as AuthUser &
    UserInfoData;

  // Early return if no user is available
  if (!user) {
    return null;
  }

  // Format the date joined using useMemo to avoid unnecessary recalculations
  const formattedDateJoined = useMemo(() => {
    if (!user.date_joined) return "N/A";
    return dayjs(user.date_joined).format("MMMM DD, YYYY");
  }, [user.date_joined]);

  return (
    <Page>
      <AppBar title="User Information" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Profile Header */}
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title="Profile"
              titleStyle={styles.cardTitle}
              left={(props) => <IconButton {...props} icon="account-circle" />}
            />
            <Card.Content>
              <View style={[styles.cardInnerContainer]}>
                <View style={styles.headerContent}>
                  <Avatar.Image size={80} source={{ uri: user.thumbnail }} />
                  <View style={styles.headerText}>
                    <ThemedText variant="titleLarge" bold>
                      {user.display_name || user.full_name}
                    </ThemedText>
                    <ThemedText
                      variant="bodyMedium"
                      color={theme.colors.secondary}
                    >
                      @{user.username}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Personal Information */}
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title="Personal Information"
              titleStyle={styles.cardTitle}
              left={(props) => <IconButton {...props} icon="account" />}
            />
            <Card.Content>
              <View style={[styles.cardInnerContainer]}>
                <InfoItem label="Full Name" value={user.full_name} />
                <InfoItem label="Short Name" value={user.short_name} />
                <InfoItem
                  label="Gender"
                  value={
                    user.gender === "M"
                      ? "Male"
                      : user.gender === "F"
                      ? "Female"
                      : user.gender
                  }
                />
              </View>
            </Card.Content>
          </Card>

          {/* Account Information */}
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title="Account Information"
              titleStyle={styles.cardTitle}
              left={(props) => (
                <IconButton {...props} icon="card-account-details" />
              )}
            />
            <Card.Content>
              <TouchableRipple>
                <View style={[styles.cardInnerContainer]}>
                  <InfoItem label="Email" value={user.email} />
                  <InfoItem label="Username" value={`@${user.username}`} />
                  <InfoItem label="User Type" value={user.type} />
                  <InfoItem label="School" value={user.school_name} />
                  <InfoItem label="Date Joined" value={formattedDateJoined} />
                  <View style={styles.privacyContainer}>
                    <ThemedText variant="bodyMedium" bold style={styles.label}>
                      Account Privacy:
                    </ThemedText>
                    <Chip
                      icon={user.profile.is_private ? "lock" : "lock-open"}
                      style={[
                        styles.privacyChip,
                        {
                          backgroundColor: user.profile.is_private
                            ? theme.colors.errorContainer
                            : theme.colors.primaryContainer,
                        },
                      ]}
                    >
                      {user.profile.is_private ? "Private" : "Public"}
                    </Chip>
                  </View>
                </View>
              </TouchableRipple>
            </Card.Content>
          </Card>

          {/* Statistics */}
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title="Statistics"
              titleStyle={styles.cardTitle}
              left={(props) => <IconButton {...props} icon="chart-bar" />}
            />
            <Card.Content>
              <TouchableRipple>
                <View style={[styles.cardInnerContainer]}>
                  <View style={styles.statsContainer}>
                    <StatInfo
                      label="Reputation"
                      value={user.reputation}
                      valueColor="gold"
                    />
                    <StatInfo label="Reach" value={user.reach} />
                    <StatInfo label="Views" value={user.total_views} />
                  </View>
                </View>
              </TouchableRipple>

              <View style={styles.followStatsContainer}>
                <Row style={{ justifyContent: "space-around", width: "100%" }}>
                  <FollowStatItem
                    label="Followers"
                    value={user.followers_count}
                    theme={theme}
                    icon="people-outline"
                  />
                  <FollowStatItem
                    label="Following"
                    value={user.followings_count}
                    theme={theme}
                    icon="person-add-outline"
                  />
                </Row>
              </View>
            </Card.Content>
          </Card>

          {/* Biography */}
          {user.profile.biography && (
            <Card style={styles.card} mode="elevated">
              <Card.Title
                title="Biography"
                titleStyle={styles.cardTitle}
                left={(props) => <IconButton {...props} icon="text-box" />}
              />
              <Card.Content>
                <TouchableRipple>
                  <View style={[styles.cardInnerContainer]}>
                    <ThemedText variant="bodyLarge" style={styles.biography}>
                      "{user.profile.biography}"
                    </ThemedText>
                  </View>
                </TouchableRipple>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </Page>
  );
};

/**
 * InfoItem - Component for displaying a label-value pair
 */
const InfoItem = React.memo(
  ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoItem}>
      <ThemedText variant="bodyMedium" bold style={styles.label}>
        {label}:
      </ThemedText>
      <ThemedText variant="bodyMedium" style={styles.value}>
        {value}
      </ThemedText>
    </View>
  )
);

/**
 * StatInfo - Component for displaying a statistic
 */
const StatInfo = React.memo(
  ({
    label,
    value,
    valueColor,
    labelColor,
  }: {
    label: string;
    value: number;
    valueColor?: string;
    labelColor?: string;
  }) => (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ThemedText color={valueColor} variant="titleLarge">
        {value}
      </ThemedText>
      <ThemedText color={labelColor ?? "gray"} variant="labelMedium">
        {label}
      </ThemedText>
    </View>
  )
);

/**
 * FollowStatItem - Component for displaying follower/following stats
 */
const FollowStatItem = React.memo(
  ({
    label,
    value,
    theme,
    icon,
  }: {
    label: string;
    value: number;
    theme: any;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <View style={styles.followStatItem}>
      <Row alignItems="center" style={{ gap: 8 }}>
        <Ionicons name={icon} size={24} color={theme.colors.primary} />
        <ThemedText variant="titleLarge" bold>
          {value}
        </ThemedText>
      </Row>
      <ThemedText variant="bodyMedium" color="gray">
        {label}
      </ThemedText>
    </View>
  )
);

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  contentContainer: {
    padding: DEFAULT_CONTAINER_SPACING,
    gap: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardInnerContainer: {
    borderRadius: 10,
    padding: 12,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 4,
  },
  label: {
    minWidth: 120,
  },
  value: {
    flex: 1,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 4,
  },
  privacyChip: {
    height: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  followStatsContainer: {
    paddingVertical: 16,
    marginTop: 8,
    alignItems: "center",
  },
  followStatItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  biography: {
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 16,
    lineHeight: 24,
  },
});

export default React.memo(UserInfoScreen);
