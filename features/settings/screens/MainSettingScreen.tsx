import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";
import { ContainerView } from "@components/styled";
import { AppBar } from "@features/navigation/components/AppBar";
import { useRouter } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, View } from "react-native";
import { useTheme } from "react-native-paper";

const MainSettingScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  return (
    <Page>
      <AppBar divider title={t("settings.settings")} />
      <ContainerView>
        <SettingButton
          onPress={() => router.push("/settings/privacy")}
          title={t("settings.privacy")}
        />
        <SettingButton title={t("settings.personal_info")} />
        <SettingButton title={t("settings.your_account")} />
        <SettingButton title={t("settings.notifications")} />
        <SettingButton
          onPress={() => router.push("/settings/appearance")}
          title={t("settings.appearance")}
        />
      </ContainerView>
    </Page>
  );
};

export type SettingButtonProps = {
  title: string;
} & PressableProps;

const SettingButton = ({ title, ...props }: SettingButtonProps) => {
  return (
    <Pressable {...props}>
      <View style={{ padding: 10, marginTop: 5, marginBottom: 5 }}>
        <ThemedText variant="titleLarge">{title}</ThemedText>
      </View>
    </Pressable>
  );
};

export default MainSettingScreen;
