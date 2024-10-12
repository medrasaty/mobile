import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserProfile } from "../types";
import FastImage from "react-native-fast-image";
import { Button, useTheme } from "react-native-paper";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import { ContainerView } from "@/components/styled";
import { useTranslation } from "react-i18next";
import Row from "@/components/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useProfileScreen } from "../contexts/ProfileScreenContext";

type ProfileInfoProps = {} & ViewProps;

const ProfileInfo = ({ style, ...props }: ProfileInfoProps) => {
  const { profile } = useProfileScreen();
  return (
    <ContainerView style={[style, styles.container]} {...props}>
      <Row style={styles.row}>
        <ProfilePicture url={profile.profile_picture} />
        <Follow />
      </Row>
      <UserInfo
        fullName={profile.full_name}
        username={profile.username}
        schoolName={profile.school_name}
        type={profile.type}
      />
      <Bio bio={"لامكان لليأس في التطبيق"} />
      <StatsInfo style={{ marginTop: 10 }} profile={profile} />
    </ContainerView>
  );
};

export const Follow = () => {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.follow}>
      <Button onPress={() => {}} icon={"account"} mode="outlined">
        {t("follow")}
      </Button>
    </ThemedView>
  );
};

const ProfilePicture = ({ url }: { url: UserProfile["profile_picture"] }) => {
  const styles = useProfilePictureStyle();
  return (
    <ThemedView style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={styles.image}
      />
    </ThemedView>
  );
};

function useProfilePictureStyle() {
  const theme = useTheme();
  const AVATAR_SIZE = 100;
  const marginTopFactor = 0.4;
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: -AVATAR_SIZE * marginTopFactor,
      },
      image: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderColor: theme.colors.surface,
        borderWidth: 3,
        shadowColor: theme.colors.shadow,
        elevation: 10,
      },
    });
  }, [theme]);
}

type UserProfileProps = {
  fullName: UserProfile["full_name"];
  username: UserProfile["username"];
  schoolName: UserProfile["school_name"];
  type: UserProfile["type"];
};

const UserInfo = ({
  fullName,
  username,
  schoolName,
  type,
}: UserProfileProps) => {
  return (
    <ThemedView>
      <ThemedText bold variant="titleLarge">
        {fullName}
      </ThemedText>
      <Username username={username} />
      <School name={schoolName} />
    </ThemedView>
  );
};

const Username = ({ username }: { username: string }) => {
  const variant = "bodyMedium";
  return <ThemedText variant={variant}>@{username}</ThemedText>;
};

export const School = ({ name }: { name: string }) => {
  const theme = useTheme();
  return (
    <Row alignItems="center" style={{ gap: 4 }}>
      <MaterialCommunityIcons
        size={18}
        name="school"
        color={theme.colors.primary}
      />
      <ThemedText variant="bodyMedium">{name}</ThemedText>
    </Row>
  );
};

const Bio = ({ bio }: { bio: string }) => {
  return <ThemedText variant="bodyLarge">{bio}</ThemedText>;
};

type StatsInfoProps = {
  profile: UserProfile;
} & ViewProps;

const StatsInfo = ({ profile, style, ...props }: StatsInfoProps) => {
  const { t } = useTranslation();
  const styles = useStatsInfoStyle();
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[style, styles.container]}
      {...props}
    >
      <Row style={styles.row}>
        <StatInfo
          valueColor="gold"
          label={t("Reputation")}
          value={profile.reputation_points}
        />
        <StatInfo label={t("Reach")} value={profile.reach} />
        <StatInfo label={t("Total_views")} value={profile.total_views} />
      </Row>
      {/*<Row style={styles.row}>
        <StatInfo label={t("Followers")} value={profile.followers_count} />
        <StatInfo label={t("Following")} value={profile.followings_count} />
        </Row> */}
    </TouchableOpacity>
  );
};

function useStatsInfoStyle() {
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: theme.colors.surfaceVariant,
        gap: 10,
      },
      row: {
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 10,
      },
    });
  }, [theme]);
}

export const StatInfo = ({
  label,
  value,
  valueColor,
  labelColor,
}: {
  label: string;
  value: number;
  valueColor?: string;
  labelColor?: string;
}) => {
  const theme = useTheme();
  return (
    <ThemedView style={{ alignItems: "center" }}>
      <ThemedText color={valueColor} variant="titleLarge">
        {value}
      </ThemedText>
      <ThemedText color={labelColor ?? "gray"} variant="labelMedium">
        {label}
      </ThemedText>
    </ThemedView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    // marginTop: -50,
  },
  row: {
    justifyContent: "space-between",
  },
  follow: {
    marginTop: 10,
  },
});
