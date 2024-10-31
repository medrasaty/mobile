import { ThemedText } from "@/components/ThemedText";
import useVisible from "@/hooks/useVisible";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "react-native-paper";

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

export default ConfirmDialog;
