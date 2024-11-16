import {
  FollowBack,
  FollowButton,
  FollowRequestButton,
  FollowRequestStatusButton,
  UnfollowButton,
} from "@/features/friendship/components/FollowActionButtons";
import { FollowingRequestStatus, UserProfile } from "../types.types";
import { ButtonProps, IconButton, Tooltip, useTheme } from "react-native-paper";
import Row from "@/components/Row";
import SheetView, { useSheetViewRef } from "@/components/SheetView";
import { useProfileScreen } from "../contexts/ProfileScreenContext";
import { BaseUser } from "@/types/user.types";
import { ContainerView } from "@/components/styled";
import {
  BlockButton,
  UnblockButton,
} from "@/features/blacklist/components/BlackListUserCell";
import { Button } from "react-native-paper";
import { t } from "i18next";
import ReportDialog from "@/features/reports/components/ReportDialog";
import { useVisibleV2 } from "@/hooks/useVisible";

type ProfileFollowingSectionProps = {
  user: UserProfile;
};

const ProfileActionsSection = ({ user }: ProfileFollowingSectionProps) => {
  return (
    <Row style={{ justifyContent: "flex-end" }} alignItems="center">
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
      />
      <SheetView ref={sheetRef} snapPoints={[140]}>
        <ContainerView style={{ gap: 6 }}>
          <ToggleBlockingButton username={profile.username} />
          <ReportUser />
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

  return profile.is_blocker ? (
    <UnblockButton username={username} />
  ) : (
    <BlockButton username={username} />
  );
};

export const ReportUser = () => {
  const theme = useTheme();
  const { profile } = useProfileScreen();
  const [visible, show, hide] = useVisibleV2(false);
  return (
    <>
      <Button
        onPress={show}
        theme={{ colors: { primary: theme.colors.error } }}
        mode="outlined"
      >
        {t("Report")}
      </Button>
      <ReportDialog
        visible={visible}
        onDismiss={hide}
        contentTypeId={profile.contenttype}
        objectId={profile.id}
      />
    </>
  );
};

export const FollowingActions = ({ user }: { user: UserProfile }) => {
  // TODO: refactor this component
  if (user.is_blocked || user.is_blocker)
    return <FollowButton disabled username={user.username} />;

  if (user.is_following) return <UnfollowButton username={user.username} />;

  if (user.is_follower) return <FollowBack username={user.username} />;

  if (user.profile.is_private) {
    if (user.following_request_status !== FollowingRequestStatus.PENDING) {
      return (
        <FollowRequestButton
          disabled={user.is_blocked}
          username={user.username}
        />
      );
    }

    return <FollowRequestStatusButton />;
  }

  return <FollowButton username={user.username} />;
};

export default ProfileActionsSection;
