import {
  FollowBack,
  FollowButton,
  FollowRequestButton,
  FollowRequestStatusButton,
  UnfollowButton,
} from "@/features/friendship/components/FollowActionButtons";
import { UserProfile } from "../types";
import { ButtonProps, IconButton, Tooltip, useTheme } from "react-native-paper";
import Row from "@/components/Row";
import SheetView, { useSheetViewRef } from "@/components/SheetView";
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
import { Ionicons } from "@expo/vector-icons";
import { path } from "@/lib/routing";
import { router } from "expo-router";

type ProfileFollowingSectionProps = {
  profile: UserProfile;
};

const ProfileActionsSection = ({ profile }: ProfileFollowingSectionProps) => {
  return (
    <Row style={{ justifyContent: "flex-end" }} alignItems="center">
      {profile.is_self ? (
        <Button
          mode="contained"
          icon={(props) => {
            return <Ionicons name="settings-outline" {...props} />;
          }}
          onPress={() => router.push(path.settings.main)}
        >
          {t("settings.settings")}
        </Button>
      ) : (
        <>
          <FollowingActions profile={profile} />
          <MoreOptions profile={profile} />
        </>
      )}
    </Row>
  );
};

export const MoreOptions = ({ profile }: { profile: UserProfile }) => {
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
          <ToggleBlockingButton
            isBlocker={profile.is_blocker}
            pk={profile.pk}
          />
          <ReportUser userId={profile.id} contentTypeId={profile.contenttype} />
        </ContainerView>
      </SheetView>
    </>
  );
};

export const ToggleBlockingButton = ({
  pk,
  isBlocker,
  onPress,
  ...props
}: { pk: BaseUser["pk"]; isBlocker: boolean } & Omit<
  ButtonProps,
  "children"
>) => {
  return isBlocker ? <UnblockButton pk={pk} /> : <BlockButton pk={pk} />;
};

export const ReportUser = ({
  userId,
  contentTypeId,
}: {
  userId: UserProfile["id"];
  contentTypeId: UserProfile["contenttype"];
}) => {
  const theme = useTheme();
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
        contentTypeId={contentTypeId}
        objectId={userId}
      />
    </>
  );
};

export const FollowingActions = ({ profile }: { profile: UserProfile }) => {
  // TODO: refactor this component
  if (profile.is_blocked || profile.is_blocker)
    return <FollowButton disabled pk={profile.pk} />;

  if (profile.is_following) return <UnfollowButton pk={profile.pk} />;

  if (profile.is_follower) return <FollowBack pk={profile.pk} />;

  if (profile.profile.is_private) {
    if (profile.following_request_status !== "pending") {
      return (
        <FollowRequestButton disabled={profile.is_blocked} pk={profile.pk} />
      );
    }

    return <FollowRequestStatusButton />;
  }

  return <FollowButton pk={profile.pk} />;
};

export default ProfileActionsSection;
