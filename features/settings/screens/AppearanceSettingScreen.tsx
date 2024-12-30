import Page from "@components/Page";
import SwitchOption from "../components/ToggleOption";
import { useSettingStore } from "../store";
import { useTranslation } from "react-i18next";
import { AppBar } from "@features/navigation/components/AppBar";
import { View } from "react-native";
import { Divider, Surface } from "react-native-paper";

const AppearanceSettingScreen = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <AppBar title={t("settings.appearance")} />
      <Divider />
      <ToggleDarkTheme />
    </Page>
  );
};

const ToggleDarkTheme = () => {
  const theme = useSettingStore((state) => state.theme);
  const setTheme = useSettingStore((state) => state.setTheme);
  const { t } = useTranslation();
  return (
    <View style={{ padding: 10 }}>
      <SwitchOption
        onChange={() => {
          alert("solo");
          if (theme !== "dark") setTheme("dark");
          else setTheme("light");
        }}
        label={t("theme.dark")}
        labelProps={{ variant: "titleSmall" }}
        value={theme === "dark"}
      />
    </View>
  );
};

export default AppearanceSettingScreen;
