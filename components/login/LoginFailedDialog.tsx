import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";

type LoignFailedDialogProps = {
  visible: boolean;
  errorMessage?: string;
  hideDialog: () => void;
};

export default function LoginFailedDialog({
  visible,
  errorMessage = "كلمة السر أو البريد الإلكتروني غير صحيح ",
  hideDialog,
}: LoignFailedDialogProps) {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>خطأ في تسجيل الدخول</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{errorMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>اعادة المحاولة</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
