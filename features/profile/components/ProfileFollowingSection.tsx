import {
    FollowBack,
    FollowButton,
    FollowRequestButton,
    FollowRequestStatusButton,
    UnfollowButton,
} from "@/features/friendship/components/FollowActionButtons";
import { FollowingRequestStatus, UserProfile } from "../types.types";

type ProfileFollowingSectionProps = {
  user: UserProfile;
};

const ProfileFollowingSection = ({ user }: ProfileFollowingSectionProps) => {
  if (user.is_following)
    return <UnfollowButton mode="outlined" username={user.username} />;

  if (user.is_follower) return <FollowBack username={user.username} />;

  if (user.profile.is_private) {
    // pending: show disabled pending button
    // accepted: show unfollow button
    // rejected: show normal send request button

    if (user.following_request_status !== FollowingRequestStatus.PENDING) {
      return <FollowRequestButton username={user.username} />;
    }

    return <FollowRequestStatusButton />;
  }

  return <FollowButton username={user.username} />;
};

export default ProfileFollowingSection;
