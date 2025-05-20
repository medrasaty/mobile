import ReputationInfo from "@/components/ReputationInfo";
import Row from "@/components/Row";
import { Container } from "@/components/styled";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins } from "@/constants/styels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { UserProfile } from "../types";
import ProfileActionsSection from "./ProfileFollowingSection";
import Biography from "./Biography";

type ProfileInfoProps = {
  profile: UserProfile;
} & ViewProps;

const ProfileInfo = ({ profile, style, ...props }: ProfileInfoProps) => {
  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Row>
        <ProfilePicture url={profile.thumbnail} />
        <ThemedView style={styles.actionSection}>
          <ProfileActionsSection profile={profile} />
        </ThemedView>
      </Row>
      <Container style={{ gap: 10 }}>
        <UserInfo
          fullName={profile.full_name}
          username={profile.username}
          schoolName={profile.school_name}
          schoolId={profile.school}
          type={profile.type}
          biography={profile.profile.biography}
        />
      </Container>
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
  const theme = useTheme();

  return (
    <View style={[style, styles.container]} {...props}>
      <View
        style={{
          borderRadius: 100,
          borderWidth: 2,
          borderColor: theme.colors.secondaryContainer,
        }}
      >
        <Image contentFit="cover" source={{ uri: url }} style={styles.image} />
      </View>
    </View>
  );
};

export function useProfilePictureStyle() {
  const theme = useTheme();
  const AVATAR_SIZE = 120;
  const marginTopFactor = 0.4;
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        marginTop: -AVATAR_SIZE * marginTopFactor,
        ...containerMargins,
      },
      image: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderColor: theme.colors.secondaryContainer,
        backgroundColor: theme.colors.secondary,
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
  biography: UserProfile["profile"]["biography"];
};

const UserInfo = ({
  fullName,
  username,
  schoolName,
  schoolId,
  biography,
  type,
}: UserProfileProps) => {
  return (
    <View style={{ gap: 10 }}>
      <View>
        <ThemedText bold variant="titleLarge">
          {fullName}
        </ThemedText>
        <Username username={username} />
        <School id={schoolId} name={schoolName} />
      </View>
      <Biography>{biography}</Biography>
    </View>
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

export default ProfileInfo;

const statsInfoContainerMargins = 10;

const styles = StyleSheet.create({
  container: {
    gap: 16,
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
