import { Slot, Stack } from "expo-router";
import { I18nManager } from "react-native";

const SettingsLayout = () => {
  const animation = I18nManager.isRTL ? "slide_from_left" : "slide_from_right";
  return (
    <Stack
      screenOptions={{
        animation: animation,
        headerShown: false,
      }}
    />
  );
};

export default SettingsLayout;
