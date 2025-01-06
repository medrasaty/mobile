// TopTabs.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

interface TopTabsProps extends MaterialTopTabBarProps {
  tabStyle?: "default" | "pill" | "underline";
  activeColor?: string;
  inactiveColor?: string;
  indicatorColor?: string;
  backgroundColor?: string;
  labelStyle?: object;
  showBadge?: boolean;
  badgeColor?: string;
}

const TopTabsBar: React.FC<TopTabsProps> = ({
  state,
  descriptors,
  navigation,
  tabStyle = "underline",
  activeColor = "#000",
  inactiveColor = "#666",
  indicatorColor = "#000",
  backgroundColor = "#fff",
  labelStyle,
  showBadge,
  badgeColor = "#FF3B30",
}) => {
  const translateX = useSharedValue(0);
  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    translateX.value = state.index * (100 / state.routes.length);
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => {
    const width = 100 / state.routes.length;

    return {
      transform: [
        {
          translateX: withSpring(
            isRTL
              ? -(translateX.value * (width / 100) * width)
              : translateX.value * (width / 100) * width,
            {
              damping: 20,
              stiffness: 90,
            }
          ),
        },
      ],
      width: `${width}%`,
    };
  });

  const getIndicatorComponent = () => {
    switch (tabStyle) {
      case "pill":
        return (
          <Animated.View
            style={[
              styles.pillIndicator,
              { backgroundColor: indicatorColor },
              indicatorStyle,
            ]}
          />
        );
      case "underline":
        return (
          <Animated.View
            style={[
              styles.underlineIndicator,
              { backgroundColor: indicatorColor },
              indicatorStyle,
            ]}
          />
        );
      default:
        return (
          <Animated.View
            style={[
              styles.defaultIndicator,
              { backgroundColor: indicatorColor },
              indicatorStyle,
            ]}
          />
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
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
                  labelStyle,
                  { color: isFocused ? activeColor : inactiveColor },
                ]}
              >
                {label}
              </Text>
              {showBadge && options.tabBarBadge && (
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
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
