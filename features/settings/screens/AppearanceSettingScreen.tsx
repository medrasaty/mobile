import Page from "@components/Page";
import { useSettingStore } from "../store";
import { useTranslation } from "react-i18next";
import { AppBar } from "@features/navigation/components/AppBar";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Chip, Divider } from "react-native-paper";
import { ThemedText } from "@components/ThemedText";
import { StyleSheet } from "react-native";
import {
  DEFAULT_CONTAINER_SPACING,
  containerPaddings,
} from "@/constants/styels";
import Row from "@components/Row";
import { t } from "i18next";
import React, { useMemo } from "react";
import RadioButtonGroup, {
  RadioButtonGroupChoiceType,
} from "@components/RadioButtonGroup";
import { ThemeType } from "@features/theme/types";
import { Language } from "../types";
import Sheet, { useSheetRef } from "@components/Sheet";

enum ThemeChoices {
  Light = "light",
  Dark = "dark",
  System = "system",
}

const AppearanceSettingScreen = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <AppBar divider title={t("settings.appearance")} />
      <ChangeThemeOption />
      <Divider />
      <ChangeLanguage />
      <Divider />
    </Page>
  );
};

type ChangeThemeOptionProps = TouchableOpacityProps;

const ChangeThemeOption = ({ ...props }: ChangeThemeOptionProps) => {
  const theme = useSettingStore((state) => state.theme);
  const setTheme = useSettingStore((state) => state.setTheme);

  const sheetRef = useSheetRef();
  const themeChoices = useMemo(
    () => [
      { title: t(`theme.${ThemeChoices.Light}`), value: ThemeChoices.Light },
      { title: t(`theme.${ThemeChoices.Dark}`), value: ThemeChoices.Dark },
      { title: t(`theme.${ThemeChoices.System}`), value: ThemeChoices.System },
    ],
    []
  );

  const handleThemeChange = (choice: RadioButtonGroupChoiceType) => {
    setTheme(choice.value as ThemeType);
    sheetRef.current?.close();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          sheetRef.current?.snapToIndex(0);
        }}
        style={[{ padding: DEFAULT_CONTAINER_SPACING }]}
        {...props}
      >
        <Row alignItems="center" style={{ justifyContent: "space-between" }}>
          <View>
            <ThemedText variant="titleLarge">{t("theme.theme")}</ThemedText>
          </View>
          <View>
            <Chip theme={{ roundness: 20 }} compact mode="outlined">
              {t(`theme.${theme}`)}
            </Chip>
          </View>
        </Row>
      </TouchableOpacity>

      <Sheet ref={sheetRef} initialIndex={-1} enableDynamicSizing>
        <RadioButtonGroup
          ItemSeparatorComponent={Divider}
          radioButtonProps={{
            style: { paddingTop: 10, paddingBottom: 10 },
            titleVariant: "bodyLarge",
          }}
          onChoicePress={handleThemeChange}
          currentValue={theme}
          choices={themeChoices}
        />
      </Sheet>
    </>
  );
};

const ChangeLanguage = ({ ...props }: TouchableOpacityProps) => {
  const language = useSettingStore((state) => state.language);
  const setLanguage = useSettingStore((state) => state.setLanguage);

  const langSheetRef = useSheetRef();

  const languageChoices = useMemo(
    () => [
      { title: t(`language.ar`), value: "ar" },
      { title: t(`language.en`), value: "en" },
    ],
    []
  );

  const handleLanguageChange = (choice: RadioButtonGroupChoiceType) => {
    setLanguage(choice.value as Language);
    langSheetRef.current?.close();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          langSheetRef.current?.snapToIndex(0);
        }}
        style={[{ padding: DEFAULT_CONTAINER_SPACING }]}
        {...props}
      >
        <Row alignItems="center" style={{ justifyContent: "space-between" }}>
          <View>
            <ThemedText variant="titleLarge">
              {t("language.language")}
            </ThemedText>
          </View>
          <View>
            <Chip theme={{ roundness: 20 }} compact mode="outlined">
              {t(`language.${language}`)}
            </Chip>
          </View>
        </Row>
      </TouchableOpacity>
      <Sheet ref={langSheetRef} initialIndex={-1} enableDynamicSizing>
        <RadioButtonGroup
          ItemSeparatorComponent={Divider}
          radioButtonProps={{
            style: { paddingTop: 10, paddingBottom: 10 },
            titleVariant: "bodyLarge",
          }}
          onChoicePress={handleLanguageChange}
          currentValue={language}
          choices={languageChoices}
        />
      </Sheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containerPaddings,
    marginTop: 18,
  },
});

export default AppearanceSettingScreen;
