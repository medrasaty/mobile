import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { BlackListUser } from "../types";
import { t } from "i18next";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { useBlockUserMutation, useUnblockUserMutation } from "../mutations";
import LoadingDialog from "@/components/LoadingDialog";
import { BaseUser } from "@/types/user.types";
import UserInfo from "@components/UserInfo";

type BlackListUserCellProps = {
  user: BlackListUser;
};

const BlackListUserCell = ({ user }: BlackListUserCellProps) => {
  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.rowContainer}>
        <UserInfo user={user} />
        <ThemedView>
          <UnblockButton pk={user.pk} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export const UnblockButton = ({
  pk,
  onSuccess = () => {},
}: {
  pk: BlackListUser["pk"];
  onSuccess?: () => void;
}) => {
  const theme = useTheme();
  const { mutate: unblock, isPending } = useUnblockUserMutation(pk);
  const [visible, show, hide] = useVisibleV2(false);

  const handleUnblockUser = () => {
    hide();
    unblock(pk);
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

export const BlockButton = ({ pk }: { pk: BaseUser["pk"] }) => {
  const theme = useTheme();
  const { mutate: block, isPending } = useBlockUserMutation(pk);
  const [visible, show, hide] = useVisibleV2(false);
  const handleUnblockUser = () => {
    hide();
    block(pk);
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
