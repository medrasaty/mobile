import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal } from "react-native-paper";

export enum confirmStatus {
  CONFIRM = "confirm",
  CANCLE = "cancle",
}

type ConfirmDialogProps = {
  onConfirm: (status: confirmStatus) => void;
  message: string;
  title?: string;
  visible: boolean;
};

const ConfirmDialog = ({
  onConfirm,
  message,
  title,
  visible,
}: ConfirmDialogProps) => {
  const handlePress = (status: confirmStatus) => {
    onConfirm(status);
  };

  return (
    <Portal>
      <Dialog visible={visible}>
        {title && title?.length > 0 && <Dialog.Title>{title}</Dialog.Title>}
        <Dialog.Content>
          <ThemedText>{message}</ThemedText>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 8 }}>
          <CancelButton onPress={handlePress} />
          <ConfirmButton onPress={handlePress} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

type ConfirmDialogV2Props = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title?: string;
  visible: boolean;
};

const ConfirmDialogV2 = ({
  onConfirm,
  onCancel,
  message,
  title,
  visible,
}: ConfirmDialogV2Props) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        {title && title?.length > 0 && <Dialog.Title>{title}</Dialog.Title>}
        <Dialog.Content>
          <ThemedText>{message}</ThemedText>
        </Dialog.Content>
        <Dialog.Actions style={{ gap: 8 }}>
          <CancelButton onPress={onCancel} />
          <ConfirmButton onPress={onConfirm} />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
type ActionButtonProps = {
  onPress: (status: confirmStatus) => void;
};

export const ConfirmButton = ({ onPress }: ActionButtonProps) => {
  const { t } = useTranslation();
  const handlePress = () => {
    onPress(confirmStatus.CONFIRM);
  };

  return (
    <Button mode="contained" onPress={handlePress}>
      {t("confirm")}
    </Button>
  );
};

export const CancelButton = ({ onPress }: ActionButtonProps) => {
  const { t } = useTranslation();
  const handlePress = () => {
    onPress(confirmStatus.CANCLE);
  };

  return (
    <Button mode="text" onPress={handlePress}>
      {t("cancel")}
    </Button>
  );
};

export { ConfirmDialog, ConfirmDialogV2 };
