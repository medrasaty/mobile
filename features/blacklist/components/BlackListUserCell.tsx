import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Pressable, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import UserAvatar from "@/components/UserAvatar";
import { School } from "@/features/friendship/components/UserCompactCell";
import { router } from "expo-router";
import { BlackListUser } from "../types";
import { t } from "i18next";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { useBlockUserMutation, useUnblockUserMutation } from "../mutations";
import LoadingDialog from "@/components/LoadingDialog";
import { BaseUser } from "@/types/user.types";

type BlackListUserCellProps = {
  user: BlackListUser;
};

const BlackListUserCell = ({ user }: BlackListUserCellProps) => {
  const gotToUser = () => {
    router.push(`/users/${user.username}`);
  };

  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.rowContainer}>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <UserAvatar url={user.profile_picture} size={60} />
          <Pressable onPress={gotToUser} style={{ gap: 5 }}>
            <ThemedText>{user.short_name}</ThemedText>
            <School name={user.school_name} />
          </Pressable>
        </ThemedView>

        <ThemedView>
          <UnblockButton username={user.username} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export const UnblockButton = ({
  username,
  onSuccess = () => {},
}: {
  username: BlackListUser["username"];
  onSuccess?: () => void;
}) => {
  const theme = useTheme();
  const { mutate: unblock, isPending } = useUnblockUserMutation(username);
  const [visible, show, hide] = useVisibleV2(false);

  const handleUnblockUser = () => {
    hide();
    unblock(username);
  };

  return (
    <>
      <Button
        disabled={isPending}
        loading={isPending}
        onPress={show}
        theme={{
          colors: {
            primary: theme.colors.error,
          },
        }}
        mode="contained"
      >
        {t("Unblock")}
      </Button>
      <ConfirmDialogV2
        visible={visible}
        message="are you sure you want to unblock this user?"
        onCancel={hide}
        onConfirm={handleUnblockUser}
      />
    </>
  );
};

export const BlockButton = ({
  username,
}: {
  username: BaseUser["username"];
}) => {
  const theme = useTheme();
  const { mutate: block, isPending } = useBlockUserMutation(username);
  const [visible, show, hide] = useVisibleV2(false);
  const handleUnblockUser = () => {
    hide();
    block(username);
  };

  return (
    <>
      <Button
        onPress={show}
        theme={{
          colors: {
            primary: theme.colors.error,
          },
        }}
        mode="outlined"
      >
        {t("Block")}
      </Button>
      <ConfirmDialogV2
        visible={visible}
        message="are you sure you want to block this user?"
        onCancel={hide}
        onConfirm={handleUnblockUser}
      />
      <LoadingDialog message={t("Blocking_user...")} visible={isPending} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DEFAULT_CONTAINER_SPACING,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default BlackListUserCell;
