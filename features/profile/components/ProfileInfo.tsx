import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserProfile } from "../types";
import FastImage from "react-native-fast-image";
import { useTheme } from "react-native-paper";
import React, { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { ContainerView } from "@/components/styled";
import Row from "@/components/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileActionsSection from "./ProfileFollowingSection";
import { Link, useRouter } from "expo-router";
import ReputationInfo from "@/components/ReputationInfo";
import { containerMargins, debugStyle } from "@/constants/styels";
import WithCondition from "@/components/WithCondition";

type ProfileInfoProps = {
  profile: UserProfile;
} & ViewProps;

const ProfileInfo = ({ profile, style, ...props }: ProfileInfoProps) => {
  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Row>
        <ProfilePicture url={profile.profile_picture} />
        <ThemedView style={styles.actionSection}>
          <ProfileActionsSection profile={profile} />
        </ThemedView>
      </Row>
      <ContainerView>
        <UserInfo
          fullName={profile.full_name}
          username={profile.username}
          schoolName={profile.school_name}
          schoolId={profile.school}
          type={profile.type}
        />
        <Bio bio={profile.profile.biography} />
      </ContainerView>
      <ReputationInfo
        style={styles.reputationInfo}
        reputation={profile.reputation}
        reach={profile.reach}
        views={profile.total_views}
      />
    </ThemedView>
  );
};

export const ProfilePicture = ({
  url,
  style,
  ...props
}: { url: UserProfile["profile_picture"] | undefined } & ViewProps) => {
  const styles = useProfilePictureStyle();
  return (
    <ContainerView {...props} style={[style, styles.container]}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={styles.image}
      />
    </ContainerView>
  );
};

export function useProfilePictureStyle() {
  const theme = useTheme();
  const AVATAR_SIZE = 120;
  const marginTopFactor = 0.2;
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: -AVATAR_SIZE * marginTopFactor,
      },
      image: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderColor: theme.colors.secondaryContainer,
        backgroundColor: theme.colors.secondary,
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
  schoolId: number;
  type: UserProfile["type"];
};

const UserInfo = ({
  fullName,
  username,
  schoolName,
  schoolId,
  type,
}: UserProfileProps) => {
  return (
    <ThemedView>
      <ThemedText bold variant="displaySmall">
        {fullName}
      </ThemedText>
      <Username username={username} />
      <School id={schoolId} name={schoolName} />
    </ThemedView>
  );
};

const Username = ({ username }: { username: string }) => {
  const variant = "bodyMedium";
  return <ThemedText variant={variant}>@{username}</ThemedText>;
};

export const School = ({ id, name }: { id: number; name: string }) => {
  const theme = useTheme();
  return (
    <Row alignItems="center" style={{ gap: 4 }}>
      <MaterialCommunityIcons
        size={18}
        name="school"
        color={theme.colors.primary}
      />
      <Link href={`/schools/${id}/detail`}>
        <ThemedText variant="bodyMedium">{name}</ThemedText>
      </Link>
    </Row>
  );
};

const Bio = ({ bio }: { bio: string }) => {
  const theme = useTheme();
  return (
    <ThemedText color={"gray"} variant="bodyMedium">
      {bio}
    </ThemedText>
  );
};

export default ProfileInfo;

const statsInfoContainerMargins = 10;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  row: {
    justifyContent: "space-between",
    ...debugStyle,
  },
  actionSection: {
    flex: 1,
    margin: 10,
  },
  reputationInfo: {
    ...containerMargins,
    marginTop: statsInfoContainerMargins,
    marginBottom: statsInfoContainerMargins,
  },
});
