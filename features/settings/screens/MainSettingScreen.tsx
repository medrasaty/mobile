import { containerMargins } from "@/constants/styels";
import { path } from "@/lib/routing";
import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";
import { AppBar } from "@features/navigation/components/AppBar";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
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
        onPress={() => router.push(path.settings.privacy)}
        title={t("settings.privacy")}
      />
      <Divider />
      <SettingButton
        onPress={() => router.push(path.settings.notifications)}
        title={t("settings.notifications")}
      />
      <Divider />
      <SettingButton
        onPress={() => router.push(path.settings.appearance)}
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
