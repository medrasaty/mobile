import AlertDialog from "@/components/AlertDialog";
import useVisible from "@/hooks/useVisible";
import React, { createContext, useCallback, useContext, useState } from "react";

type AlertProps = {
  message: string;
  title?: string;
};

export type AlertDialogContextProps = {
  /**
   * function to use to disply Dialog
   */
  Alert: (message: string, title?: string) => void;
};

export const AlertDialogContext = createContext<AlertDialogContextProps>({
  Alert: () => {},
});

export type AlertDialogProviderProps = React.PropsWithChildren;

export default function AlertDialogProvider({
  children,
}: AlertDialogProviderProps) {
  const { visible, show, hide } = useVisible(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const Alert = useCallback(
    (message: string, title?: string) => {
      if (message) setMessage(message);
      if (title) setTitle(title);
      show();
    },
    [message]
  );

  return (
    <AlertDialogContext.Provider value={{ Alert }}>
      {children}
      <AlertDialog
        title={title}
        message={message}
        visible={visible}
        onDismiss={hide}
      />
    </AlertDialogContext.Provider>
  );
}

export function useAlert() {
  const value = React.useContext(AlertDialogContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAlert must be used within a <AlertDialogProvider>");
    }
  }

  return value.Alert;
}
