// TopTabs.tsx
import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import { useTheme, MD3Theme } from "react-native-paper";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import Animated, { 
  useAnimatedStyle, 
  withTiming,
} from "react-native-reanimated";
import { Route } from "@react-navigation/native";

interface TopTabsProps extends MaterialTopTabBarProps {
  showBadge?: boolean;
}

interface TabItemProps {
  route: Route<string>;
  index: number;
  isFocused: boolean;
  options: any;
  onPress: () => void;
  theme: MD3Theme;
  showBadge?: boolean;
}

// Memoize the tab item to prevent unnecessary re-renders
const TabItem = memo<TabItemProps>(({ 
  route, 
  index, 
  isFocused, 
  options, 
  onPress,
  theme,
  showBadge 
}) => {
  const label =
    options.tabBarLabel !== undefined
      ? typeof options.tabBarLabel === 'function'
        ? options.tabBarLabel({ focused: isFocused, color: theme.colors.primary, children: route.name })
        : String(options.tabBarLabel)
      : options.title !== undefined
      ? String(options.title)
      : String(route.name);

  // Create simpler animation styles with fewer properties
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: withTiming(
      isFocused 
        ? theme.colors.primary 
        : theme.colors.onSurfaceVariant,
      { duration: 150 }
    ),
    fontWeight: isFocused ? '600' : '500',
  }), [isFocused, theme.colors.primary, theme.colors.onSurfaceVariant]);

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateY: withTiming(isFocused ? -2 : 0, { duration: 150 }) 
    }]
  }), [isFocused]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0, { duration: 150 }),
    width: withTiming(isFocused ? '50%' : '0%', { duration: 200 }),
  }), [isFocused]);

  return (
    <Animated.View
      key={route.key}
      style={[styles.tab, animatedTabStyle]}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        style={styles.touchable}
      >
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {label}
        </Animated.Text>
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor: theme.colors.primary },
            animatedIndicatorStyle
          ]}
        />
        {showBadge && options.tabBarBadge && (
          <View
            style={[
              styles.badge,
              { backgroundColor: theme.colors.error },
            ]}
          >
            <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
              {String(options.tabBarBadge)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}, (prev, next) => {
  // Custom comparison function for memo
  return (
    prev.isFocused === next.isFocused && 
    prev.route.key === next.route.key &&
    prev.showBadge === next.showBadge &&
    JSON.stringify(prev.options.tabBarBadge) === JSON.stringify(next.options.tabBarBadge)
  );
});

const TopTabsBar: React.FC<TopTabsProps> = ({
  state,
  descriptors,
  navigation,
  showBadge,
}) => {
  const theme = useTheme();
  const isRTL = I18nManager.isRTL;

  // Memoize the onPress handler for each tab
  const getTabPressHandler = useCallback((route: Route<string>, isFocused: boolean) => {
    return () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = getTabPressHandler(route, isFocused);

          return (
            <TabItem
              key={route.key}
              route={route}
              index={index}
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              theme={theme}
              showBadge={showBadge}
            />
          );
        })}
      </View>
    </View>
  );
};

// Optimized styles - fixed values where possible
const styles = StyleSheet.create({
  container: {
    height: 52,
    elevation: 0,
  },
  tabsContainer: {
    flexDirection: "row",
    height: "100%",
    paddingHorizontal: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    textAlign: "center",
  },
  indicator: {
    position: 'absolute',
    bottom: 2,
    height: 3,
    borderRadius: 1.5,
    alignSelf: 'center',
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
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
});

export default memo(TopTabsBar);
