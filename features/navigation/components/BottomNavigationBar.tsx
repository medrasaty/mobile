import { CommonActions } from "@react-navigation/native";
import React from "react";
import { BottomNavigation, Divider, useTheme } from "react-native-paper";
import { MaterialBottomTabNavigatorProps } from "react-native-paper/lib/typescript/react-navigation/navigators/createMaterialBottomTabNavigator";
import { GruvboxDarkCyan, GruvboxLightCyan } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

export default function BottomTabNavigationBar({
  navigation,
  state,
  descriptors,
  insets,
  style,
}) {
  function handleTabPress({ route, preventDefault }) {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (event.defaultPrevented) {
      preventDefault();
    } else {
      navigation.dispatch({
        ...CommonActions.navigate(route.name, route.params),
        target: state.key,
      });
    }
  }

  function renderIcon({ route, focused, color }) {
    const theme = useTheme();
    const { options } = descriptors[route.key];
    if (options.tabBarIcon) {
      return options.tabBarIcon({
        focused,
        color: theme.colors.primary,
        size: 24,
      });
    }

    return null;
  }

  function getLabelText({ route }) {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.title;

    return label;
  }

  return (
    <>
      <Divider />
      <BottomNavigation.Bar
        shifting
        style={style}
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={handleTabPress}
        renderIcon={renderIcon}
        getLabelText={getLabelText}
      />
    </>
  );
}
