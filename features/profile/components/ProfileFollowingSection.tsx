import {
  FollowBack,
  FollowButton,
  FollowRequestButton,
  FollowRequestStatusButton,
  UnfollowButton,
} from "@/features/friendship/components/FollowActionButtons";
import { FollowingRequestStatus, UserProfile } from "../types.types";
import { ButtonProps, IconButton, Portal, useTheme } from "react-native-paper";
import Row from "@/components/Row";
import SheetView, { useSheetViewRef } from "@/components/SheetView";
import { useEffect } from "react";
import { useProfileScreen } from "../contexts/ProfileScreenContext";
import { BaseUser } from "@/types/user.types";
import { ContainerView } from "@/components/styled";
import { useVisibleV2 } from "@/hooks/useVisible";
import { useBlockUserMutation } from "@/features/blacklist/mutations";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import {
  BlockButton,
  UnblockButton,
} from "@/features/blacklist/components/BlackListUserCell";
import { useIsMutating, useMutationState } from "@tanstack/react-query";
import { BlackListKeys } from "@/features/blacklist/keys";

type ProfileFollowingSectionProps = {
  user: UserProfile;
};

const ProfileActionsSection = ({ user }: ProfileFollowingSectionProps) => {
  return (
    <Row alignItems="center">
      <FollowingActions user={user} />
      <MoreOptions />
    </Row>
  );
};

export const MoreOptions = () => {
  const { profile } = useProfileScreen();
  const sheetRef = useSheetViewRef();

  return (
    <>
      <IconButton
        onPress={() => {
          sheetRef.current?.present();
        }}
        icon={"dots-vertical"}
        mode="contained-tonal"
      />
      <SheetView ref={sheetRef} snapPoints={[180]}>
        <ContainerView style={{ gap: 10 }}>
          <ToggleBlockingButton username={profile.username} />
        </ContainerView>
      </SheetView>
    </>
  );
};

export const ToggleBlockingButton = ({
  username,
  onPress,
  ...props
}: { username: BaseUser["username"] } & Omit<ButtonProps, "children">) => {
  const { profile } = useProfileScreen();
  const { dismiss } = useBottomSheetModal();

  return profile.is_blocker ? (
    <UnblockButton username={username} />
  ) : (
    <BlockButton username={username} />
  );
};

export const FollowingActions = ({ user }: { user: UserProfile }) => {
  if (user.is_following) return <UnfollowButton username={user.username} />;

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

export default ProfileActionsSection;
