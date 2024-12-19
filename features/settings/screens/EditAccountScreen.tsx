import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { containerMargins } from "@/constants/styels";
import useCurrentUser from "@/hooks/useCurrentUser";
import ServerView, { ServerPage } from "@components/ServerView";
import { ContainerView } from "@components/styled";
import { Ionicons } from "@expo/vector-icons";
import { AppBar } from "@features/navigation/components/AppBar";
import { ProfileBackgroundImage } from "@features/profile/components/Profile";
import { ProfilePicture as BaseProfilePicture } from "@features/profile/components/ProfileInfo";
import useProfile from "@features/profile/hooks/useProfile";
import { UserProfile } from "@features/profile/types";
import { t } from "i18next";
import { View, ViewProps } from "react-native";
import { Divider, IconButton, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import SwitchOption from "../components/ToggleOption";
import { useSettingStore } from "../store";
import { useSettings } from "../hooks";

const MainSettingScreen = () => {
  const user = useCurrentUser();
  const q = useProfile(user.pk);
  return (
    <Page>
      <AppBar divider title={t("settings.settings")} />
      <ServerPage style={{ paddingTop: 10 }} status={q.status}>
        <Animated.ScrollView>
          <BackgroundImage background={q.data?.background_picture} />
          <ProfilePicture url={q.data?.profile_picture} />
          <ContainerView style={{ marginTop: 40 }}>
            <ToggleDarkTheme />
            <TogglePushNotification />
          </ContainerView>
        </Animated.ScrollView>
      </ServerPage>
    </Page>
  );
};

const ToggleDarkTheme = () => {
  const theme = useSettingStore((state) => state.theme);
  const setTheme = useSettingStore((state) => state.setTheme);
  return (
    <SwitchOption
      onChange={() => {
        if (theme !== "dark") setTheme("dark");
        else setTheme("light");
      }}
      label={t("theme.dark")}
      value={theme === "dark"}
    />
  );
};

const TogglePushNotification = () => {
  // FIXME: refactor this
  const [value, setValue] = useState(false);
  const { status, serverSettings, isRefetching, updateSettings } =
    useSettings();

  useEffect(() => {
    setValue(serverSettings?.push_notification ?? false);
  }, [serverSettings, isRefetching]);

  return (
    <ServerView status={status}>
      <SwitchOption
        onChange={() => {
          setValue(!value);
          updateSettings({
            push_notification: !serverSettings?.push_notification,
          });
        }}
        label={t("push_notification")}
        value={value}
      />
    </ServerView>
  );
};

export type BackgroundImageProps = {
  /**
   * background url
   */
  background: string | undefined;
} & ViewProps;

const BackgroundImage = ({ background, ...props }: BackgroundImageProps) => {
  const theme = useTheme();
  return (
    <View {...props}>
      <ProfileBackgroundImage background={background} />
      <IconButton
        iconColor={theme.colors.onSurfaceVariant}
        style={{
          position: "absolute",
          bottom: 4,
          right: 8,
        }}
        onPress={() => alert("edit")}
        icon="pencil"
        size={20}
      />
    </View>
  );
};

export type ProfilePictureProps = {
  url: UserProfile["profile_picture"];
} & ViewProps;

const ProfilePicture = ({ url, ...props }: ProfilePictureProps) => {
  const theme = useTheme();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }} {...props}>
      <View>
        <BaseProfilePicture url={url} />
        <IconButton
          iconColor={theme.colors.onSurfaceVariant}
          onPress={() => alert("editing")}
          style={{
            borderRadius: 100,
            backgroundColor: theme.colors.surfaceVariant,
            position: "absolute",
            bottom: 5,
            right: 8,
          }}
          icon="camera"
          size={18}
        />
      </View>
    </View>
  );
};

export type SettingSectionProps = {
  title: string;
} & ViewProps;

const SettingSection = ({
  style,
  title,
  children,
  ...props
}: SettingSectionProps) => {
  return (
    <View style={[style, { gap: 10 }]} {...props}>
      <ThemedText variant="titleMedium">{title}</ThemedText>
      <Divider />
      <View>{children}</View>
    </View>
  );
};

export default MainSettingScreen;
