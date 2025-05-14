// TopTabs.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

interface TopTabsProps extends MaterialTopTabBarProps {
  tabStyle?: "default" | "pill" | "underline";
  showBadge?: boolean;
}

const TopTabsBar: React.FC<TopTabsProps> = ({
  state,
  descriptors,
  navigation,
  tabStyle = "underline",
  showBadge,
}) => {
  const { colors } = useTheme();
  const isRTL = I18nManager.isRTL;

  const getIndicatorComponent = () => {
    switch (tabStyle) {
      case "pill":
        return (
          <View
            style={[
              styles.pillIndicator,
              { backgroundColor: colors.background },
            ]}
          />
        );
      case "underline":
        return (
          <View
            style={[
              styles.underlineIndicator,
              { backgroundColor: colors.primary },
            ]}
          />
        );
      default:
        return (
          <View
            style={[
              styles.defaultIndicator,
              { backgroundColor: colors.background },
            ]}
          />
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? colors.primary : colors.onBackground },
                ]}
              >
                {label}
              </Text>
              {showBadge && options.tabBarBadge && (
                <View style={[styles.badge, { backgroundColor: colors.error }]}>
                  <Text style={styles.badgeText}>{options.tabBarBadge}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {getIndicatorComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    height: "100%",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  defaultIndicator: {
    position: "absolute",
    height: 2,
    bottom: 0,
  },
  pillIndicator: {
    position: "absolute",
    height: 32,
    bottom: 8,
    borderRadius: 16,
    opacity: 0.1,
  },
  underlineIndicator: {
    position: "absolute",
    height: 3,
    bottom: 0,
    borderRadius: 3,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: "25%",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
});

export default TopTabsBar;
