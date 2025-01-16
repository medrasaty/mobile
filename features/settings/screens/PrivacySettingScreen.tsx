import Page from "@components/Page";
import { AppBar } from "@features/navigation/components/AppBar";
import SwitchOption from "../components/ToggleOption";
import { Divider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import ServerView, { ServerPage } from "@components/ServerView";
import { useServerSettingsQuery } from "../queries";
import { useSettings } from "../hooks";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "../defaults";

const PrivacySettingScreen = () => {
  const { t } = useTranslation();
  const q = useServerSettingsQuery();
  return (
    <Page>
      <AppBar divider title={t("settings.privacy")} />
      {/* Display full name */}
      <ServerPage status={q.status}>
        <DisplayFullName />
        <Divider />
        {/* display email */}
        <DisplayEmail />
        <Divider />
        {/* display gender */}
        <DisplayGender />
        <Divider />
      </ServerPage>
    </Page>
  );
};

const DisplayFullName = () => {
  const { t } = useTranslation();
  const { serverSettings, updateServerSettings, isUpdating } = useSettings();

  return (
    <SwitchOption
      container
      style={styles.optionStyle}
      labelProps={{ variant: "titleLarge" }}
      label={t("privacy.display_full_name.label")}
      helperText={t("privacy.display_full_name.helper_text")}
      value={serverSettings?.display_full_name}
      onValueChange={(value) => {
        updateServerSettings({ display_full_name: value });
      }}
    />
  );
};

const DisplayEmail = () => {
  const { t } = useTranslation();
  const { serverSettings, updateServerSettings } = useSettings();

  return (
    <SwitchOption
      style={styles.optionStyle}
      labelProps={{ variant: "titleLarge" }}
      label={t("privacy.display_email.label")}
      helperText={t("privacy.display_email.helper_text")}
      container
      value={serverSettings?.display_email}
      onValueChange={(value) => {
        updateServerSettings({
          display_email: value,
        });
      }}
    />
  );
};

const DisplayGender = () => {
  const { t } = useTranslation();
  const { serverSettings, updateServerSettings } = useSettings();

  return (
    <SwitchOption
      style={styles.optionStyle}
      labelProps={{ variant: "titleLarge" }}
      label={t("privacy.display_gender.label")}
      helperText={t("privacy.display_gender.helper_text")}
      container
      value={serverSettings?.display_gender}
      onValueChange={async (value) => {
        updateServerSettings({
          display_gender: value,
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
