import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

/**
 * @deprecated{use useVisibleV2 instead}
 *
 */

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

type useVisibleV2Hook = [
  boolean,
  () => void,
  () => void,
  Dispatch<SetStateAction<boolean>>
];

export function useVisibleV2(initialValue: boolean = false): useVisibleV2Hook {
  const [visible, setVisible] = useState<boolean>(initialValue);

  const show = useCallback(() => setVisible(true), [visible]);
  const hide = useCallback(() => setVisible(false), [visible]);

  return [visible, show, hide, setVisible];
}
