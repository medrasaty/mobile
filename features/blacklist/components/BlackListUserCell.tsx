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
import useUnblockUserMutation from "../mutations";
import LoadingDialog from "@/components/LoadingDialog";

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
}: {
  username: BlackListUser["username"];
}) => {
  const theme = useTheme();
  const { mutate: unblock, isPending } = useUnblockUserMutation();
  const [visible, show, hide] = useVisibleV2(false);
  const handleUnblockUser = () => {
    hide();
    unblock(username);
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
      <LoadingDialog visible={isPending} />
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
