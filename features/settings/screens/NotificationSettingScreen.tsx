import Page from "@components/Page";
import { AppBar } from "@features/navigation/components/AppBar";
import SwitchOption from "../components/ToggleOption";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useSettings } from "../hooks";

export default function NotificationSettingScreen() {
  const { t } = useTranslation();
  return (
    <Page>
      <AppBar divider title={t("settings.notifications")} />
      {/* PushNotification */}
      <TogglePushNotification />
      <Divider />
    </Page>
  );
}

const TogglePushNotification = () => {
  const { t } = useTranslation();
  const { serverSettings, updateServerSettings } = useSettings();

  const updatePushNotifications = () => {
    updateServerSettings({
      push_notification: !serverSettings.push_notification,
    });
  };

  return (
    <SwitchOption
      labelProps={{ variant: "titleLarge" }}
      label={t("notifications.push_notifications.label")}
      helperText={t("notifications.push_notifications.help")}
      container
      value={serverSettings.push_notification}
      onChange={updatePushNotifications}
    />
  );
};
