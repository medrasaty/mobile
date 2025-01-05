import Page from "@components/Page";
import { AppBar } from "@features/navigation/components/AppBar";
import SwitchOption from "../components/ToggleOption";
import { Divider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import ServerView, { ServerPage } from "@components/ServerView";
import { useServerSettingsQuery } from "../queries";
import { useSettings } from "../hooks";

const PrivacySettingScreen = () => {
  const { t } = useTranslation();
  const q = useServerSettingsQuery();
  return (
    <Page>
      <AppBar divider title={t("settings.privacy")} />
      {/* Display full name */}
      <ServerPage status={q.status}>
        <DisplayFullNameOption />
        <Divider />
        {/* display email */}
        <SwitchOption
          style={styles.optionStyle}
          labelProps={{ variant: "titleLarge" }}
          label={t("privacy.display_email.label")}
          helperText={t("privacy.display_email.helper_text")}
          container
          value={true}
        />
        <Divider />
        {/* display gender */}
        <SwitchOption
          style={styles.optionStyle}
          labelProps={{ variant: "titleLarge" }}
          label={t("privacy.display_gender.label")}
          helperText={t("privacy.display_gender.helper_text")}
          container
          value={true}
        />
        <Divider />
      </ServerPage>
    </Page>
  );
};

const DisplayFullNameOption = () => {
  const { t } = useTranslation();
  const { serverSettings, updateSettings } = useSettings();
  return (
    <SwitchOption
      style={styles.optionStyle}
      labelProps={{ variant: "titleLarge" }}
      label={t("privacy.display_full_name.label")}
      helperText={t("privacy.display_full_name.helper_text")}
      container
      value={serverSettings?.display_full_name}
      onChange={() => {
        updateSettings({
          display_full_name: !serverSettings?.display_full_name,
        });
      }}
    />
  );
};

const margins = 22;
const styles = StyleSheet.create({
  optionStyle: {
    marginTop: margins,
    marginBottom: margins,
  },
});

export default PrivacySettingScreen;
