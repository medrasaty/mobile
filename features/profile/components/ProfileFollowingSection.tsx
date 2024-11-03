import { ThemedText } from "@/components/ThemedText";
import { UserProfile } from "../types.types";
import {
  FollowBack,
  FollowButton,
  UnfollowButton,
} from "@/features/follow/components/FollowActionButtons";
import { router } from "expo-router";

type ProfileFollowingSectionProps = {
  user: UserProfile;
};

const ProfileFollowingSection = ({ user }: ProfileFollowingSectionProps) => {
  if (user.is_following)
    return <UnfollowButton mode="outlined" username={user.username} />;

  if (user.is_follower) return <FollowBack username={user.username} />;

  if (user.profile.is_private) {
    // TODO: Add private profile following logic here.
    return (
      <ThemedText onPress={() => router.back()} variant="bodyMedium">
        Private
      </ThemedText>
    );
  }

  return <FollowButton username={user.username} />;
};

export default ProfileFollowingSection;
