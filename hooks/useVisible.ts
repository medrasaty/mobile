import { useState, useEffect, useCallback } from "react";

export default function useVisible(initialValue: boolean) {
  const [visible, setVisible] = useState<boolean>(initialValue);

  const show = useCallback(() => setVisible(true), [visible]);
  const hide = useCallback(() => setVisible(false), [visible]);

  return {
    visible,
    show,
    hide,
    setVisible,
  };
}
