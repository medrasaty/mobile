import { ThemedText } from "@/components/ThemedText";
import { Animated, StyleProp, ViewStyle } from "react-native";
import { Button, Dialog, DialogProps } from "react-native-paper";
import { ThemeProp } from "react-native-paper/src/types";

type AlertDialogProps = {
  /**
   * Error message to be displayed
   */
  message: string;
  /**
   * Dialog title, if not provided title won't be rendered
   */
  title?: string;
  /**
   * Determines whether clicking outside the dialog dismiss it.
   */
  dismissable?: boolean;
  /**
   * Determines whether clicking Android hardware back button dismiss dialog.
   */
  dismissableBackButton?: boolean;
  /**
   * Callback that is called when the user dismisses the dialog.
   */
  onDismiss?: () => void;
  /**
   * Determines Whether the dialog is visible.
   */
  visible: boolean;
  /**
   * Content of the `Dialog`.
   */
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

export default function AlertDialog({
  message,
  title,
  onDismiss,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog onDismiss={onDismiss} {...props}>
      {title && title?.length > 0 && <Dialog.Title>{title}</Dialog.Title>}
      <Dialog.Content>
        <ThemedText>{message}</ThemedText>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}> تم </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
