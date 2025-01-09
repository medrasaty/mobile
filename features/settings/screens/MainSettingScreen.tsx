import { containerMargins } from "@/constants/styels";
import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";
import { ContainerView } from "@components/styled";
import { AppBar } from "@features/navigation/components/AppBar";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, View } from "react-native";
import {
  Divider,
  TouchableRipple,
  TouchableRippleProps,
} from "react-native-paper";

const MainSettingScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Page>
      <AppBar divider title={t("settings.settings")} />
      <SettingButton
        onPress={() => router.push("/settings/privacy")}
        title={t("settings.privacy")}
      />
      <Divider />
      <SettingButton title={t("settings.personal_info")} />
      <Divider />
      <SettingButton title={t("settings.your_account")} />
      <Divider />
      <SettingButton
        onPress={() => router.push("/settings/push_notifications")}
        title={t("settings.notifications")}
      />
      <Divider />
      <SettingButton
        onPress={() => router.push("/settings/appearance")}
        title={t("settings.appearance")}
      />
      <Divider />
    </Page>
  );
};

export type SettingButtonProps = {
  title: string;
  help?: string;
} & Omit<TouchableRippleProps, "children">;

const SettingButton = ({ title, help, ...props }: SettingButtonProps) => {
  return (
    <TouchableRipple {...props}>
      <View
        style={{
          padding: 10,
          marginTop: 5,
          marginBottom: 5,
          ...containerMargins,
        }}
      >
        {/* Title */}
        <ThemedText variant="titleLarge">{title}</ThemedText>
        {/* Helper text */}
        {help && <ThemedText variant="labelMedium">{help}</ThemedText>}
      </View>
    </TouchableRipple>
  );
};

export default MainSettingScreen;
