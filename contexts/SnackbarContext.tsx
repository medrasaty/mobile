import React, { useContext, createContext } from "react";
import { Snackbar } from "react-native-paper";

export type SnackbarContextType = {
  message: string;
  show: (message: string) => void;
  hide: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  message: "",
  show: () => {},
  hide: () => {},
});

export function SnackbarProvider({ children }: React.PropsWithChildren) {
  const [message, setMessage] = React.useState<string>("");

  const show = (message: string) => {
    setMessage(message);
  };

  const hide = () => {
    setMessage("");
  };

  const seconds = 3;
  const duration = seconds * 1000; // 3 seconds
  return (
    <SnackbarContext.Provider value={{ message, show, hide }}>
      {children}
      <Snackbar
        duration={duration}
        visible={message.length > 0}
        onDismiss={hide}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
