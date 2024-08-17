import React, { useContext, createContext } from "react";
import {
  useSharedValue,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

type AnimateAppBarProps = {
  visible: SharedValue<number>;
  show: () => void;
  hide: () => void;
};

export const AnimatedAppBarContext = createContext<AnimateAppBarProps>({
  visible: { value: 1 } as SharedValue<number>,
  show: () => {},
  hide: () => {},
});

export function AnimatedAppBarProvider({ children }: React.PropsWithChildren) {
  const visible = useSharedValue(1);

  const show = () => {
    visible.value = withTiming(1);
  };

  const hide = () => {
    visible.value = withTiming(0);
  };

  return (
    <AnimatedAppBarContext.Provider value={{ visible, show, hide }}>
      {children}
    </AnimatedAppBarContext.Provider>
  );
}

export function useAnimatedAppBar() {
  return useContext(AnimatedAppBarContext);
}
