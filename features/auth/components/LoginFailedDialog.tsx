import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

type LoginFailedDialogProps = {
  visible: boolean;
  errorMessage?: string;
  hideDialog: () => void;
};

export default function LoginFailedDialog({
  visible,
  errorMessage,
  hideDialog,
}: LoginFailedDialogProps) {
  const { t } = useTranslation();
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{t("auth.login_failed", "Login failed")}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {errorMessage
                ? errorMessage
                : t(
                    "auth.error_invalid_credentials",
                    "Incorrect email or password"
                  )}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{t("auth.retry", "Retry")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
