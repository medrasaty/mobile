import React from "react";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import LoadingDialog from "@/components/LoadingDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { t } from "i18next";
import { List, ListItemProps, useTheme } from "react-native-paper";
import { useUnblockAllUsersMutation } from "../mutations";

/**
 * Menu item for unblocking all users with confirmation dialog
 */
export const ClearBlacklistItem = (
  props: Omit<ListItemProps, "title" | "left">
) => {
  const [dialogVisible, showDialog, hideDialog] = useVisibleV2(false);
  const { mutate: unblockAll, isPending } = useUnblockAllUsersMutation();

  const handleConfirm = () => {
    hideDialog();
    unblockAll();
  };

  const handlePress = () => {
    // Show the confirmation dialog
    showDialog();
  };

  const theme = useTheme();

  return (
    <>
      <List.Item
        title={t("Unblock All Users")}
        titleStyle={{ color: theme.colors.error }}
        left={(props) => (
          <List.Icon
            {...props}
            color={theme.colors.error}
            icon="account-multiple-remove"
          />
        )}
        onPress={handlePress}
        {...props}
      />

      <ConfirmDialogV2
        visible={dialogVisible}
        title={t("Unblock All Users")}
        message={t(
          "Are you sure you want to unblock all users? This action cannot be undone."
        )}
        onCancel={hideDialog}
        onConfirm={handleConfirm}
      />

      <LoadingDialog
        visible={isPending}
        message={t("Unblocking all users...")}
      />
    </>
  );
};
