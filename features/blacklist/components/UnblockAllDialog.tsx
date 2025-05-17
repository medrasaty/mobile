import React from "react";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import LoadingDialog from "@/components/LoadingDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { t } from "i18next";
import { Menu, MenuItemProps } from "react-native-paper";
import { useUnblockAllUsersMutation } from "../mutations";

/**
 * Menu item for unblocking all users with confirmation dialog
 */
export const UnblockAllMenuItem = (props: Omit<MenuItemProps, "title" | "leadingIcon">) => {
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

  return (
    <>
      <Menu.Item 
        title={t("Unblock All Users")} 
        leadingIcon="account-multiple-remove" 
        {...props}
        onPress={handlePress}
      />
      
      <ConfirmDialogV2
        visible={dialogVisible}
        title={t("Unblock All Users")}
        message={t("Are you sure you want to unblock all users? This action cannot be undone.")}
        onCancel={hideDialog}
        onConfirm={handleConfirm}
      />
      
      <LoadingDialog visible={isPending} message={t("Unblocking all users...")} />
    </>
  );
}; 