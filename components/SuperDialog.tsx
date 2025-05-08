import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import LoadingDialog from "./LoadingDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import AlertDialog from "./AlertDialog";

type BaseSuperDialogProps = {
  title?: string;
  body: string;
};

type ConfirmSuperDialogProps = {
  mode: "confirm";
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
} & BaseSuperDialogProps;

type AlertSuperDialogProps = {
  mode: "alert";
  // Title is required in Alert
  title: string;
  icon?: ReactNode;
} & BaseSuperDialogProps;

type LoadingSuperDialogProps = {
  mode: "loading";
} & BaseSuperDialogProps;

type SuperDialogProps =
  | LoadingSuperDialogProps
  | ConfirmSuperDialogProps
  | AlertSuperDialogProps;

/**
 * Super Dialog is a dialog that can be used as alert, confirm, loading, etc,
 * all from a single component
 * @param param0
 * @returns
 */
const SuperDialog = ({ ...props }: SuperDialogProps) => {
  // TODO: complete this emplementation
  if (props.mode == "loading") {
    return <LoadingDialog visible message={props.body} />;
  }

  if (props.mode == "confirm") {
    return (
      <ConfirmDialog
        visible
        message={props.title}
        title={props.title}
        onConfirm={props.onConfirm}
      />
    );
  }
};

export default SuperDialog;
