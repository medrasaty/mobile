import { AppBar } from "@/features/navigation/components/AppBar";
import { BaseUser } from "@/types/user.types";
import Page from "@components/Page";
import ReputationInfo from "@components/ReputationInfo";
import ScrollPage from "@components/ScrollPage";
import { ContainerView } from "@components/styled";
import { ThemedText } from "@components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import React from "react";
import { View, ViewProps } from "react-native";
import { Divider, TextProps, TouchableRipple } from "react-native-paper";
import { useTheme } from "react-native-paper/src/core/theming";

type CurrentUserProfileScreenProps = { id: BaseUser["id"] } & ViewProps;

const CurrentUserProfileScreen = ({
  id,
  ...props
}: CurrentUserProfileScreenProps) => {
  const theme = useTheme();
  return (
    <Page>
      <AppBar divider backAction={false} title={t("profile")} />
      <ScrollPage>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View
            style={{
              height: 140,
              width: "95%",
              backgroundColor: "#333",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: 120,
              width: 120,
              marginTop: -65,
              backgroundColor: "gray",
              borderRadius: 100,
            }}
          />

          <View style={{ gap: 5, marginTop: 6, alignItems: "center" }}>
            {/* display name */}
            <View style={{ alignItems: "center" }}>
              <ThemedText bold variant="titleLarge">
                Solo is Shayea Here
              </ThemedText>

              {/* Username */}
              <ThemedText bold variant="bodySmall">
                @usernameishere
              </ThemedText>
            </View>

            <View style={{ alignItems: "center" }}>
              {/* real name */}
              <ThemedText color="gray" variant="labelLarge">
                Ahmed Abdulelah Haider Shayea
              </ThemedText>

              {/* Email */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Ionicons color={theme.colors.secondary} name="mail" />
                <ThemedText variant="labelSmall">
                  ahmedshayea@gmail.com
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* extra  other info */}
        <ContainerView style={{ marginTop: 20, gap: 12 }}>
          {/* Biography */}
          <ThemedText color="#333" variant="bodyMedium">
            Biography is here and htere but soon it won't be everywhere
          </ThemedText>
          <ReputationInfo reach={100} views={393} reputation={393} />
        </ContainerView>
        <ContainerView style={{ marginTop: 30, gap: 8 }}>
          <Divider bold />
          <NavigationButtonsList
            items={[
              {
                path: "settings",
                icon: "settings",
                label: "Settings",
              },
            ]}
          />
        </ContainerView>
      </ScrollPage>
    </Page>
  );
};

type InfoIconProps<T> = {
  icon?: (props: any) => React.ReactNode;
  label: string;
  labelProps?: TextProps<T>;
} & ViewProps;

function InfoIcon<T>({
  icon,
  label,
  labelProps,
  style,
  ...props
}: InfoIconProps<T>) {
  const theme = useTheme();

  const renderIcon = () => {
    return icon ? icon({ size: 14, color: theme.colors.secondary }) : null;
  };
  return (
    <View
      style={[style, { flexDirection: "row", gap: 5, alignItems: "center" }]}
      {...props}
    >
      <View>{renderIcon()}</View>
      <View>
        <ThemedText bold variant={"bodyMedium"} {...labelProps}>
          {label}
        </ThemedText>
      </View>
    </View>
  );
}

/*
 * create a function that accept a list of navigation buttons
 * [
 *   {
 *      path: "/home/solo/settings",
 *      icon: "settings", () => <Ionicons name="somthign"/>,
 *      label: "Settings",
 *   }
 *   {
 *      path: "/home/solo/history",
 *      icon: "history", () => <Ionicons name="somthign"/>,
 *      label: "Watch history",
 *   }
 * ]
 *
 * it should return a list of buttons renderd manually without using flatlist nor ScrollView
 *
 */

type NavigationButton = {
  path: string;
  icon: string;
  label: string;
};
function NavigationButtonsList({ items }: { items: NavigationButton[] }) {
  const router = useRouter();
  return (
    <View>
      {items.map((item) => (
        <TouchableRipple
          onPress={() => router.push(item.path)}
          style={styles.pageOptionButton}
        >
          <View
            style={{
              marginStart: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons name={item.icon} size={20} color={"gray"} />
            <ThemedText>{item.label}</ThemedText>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
}

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  pageOptionButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 14,
    justifyContent: "center",
  },
});

export default CurrentUserProfileScreen;
