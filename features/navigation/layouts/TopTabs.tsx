import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import TopTabsBar from "../components/TopTabs";

const { Navigator } = createMaterialTopTabNavigator();

/**
 * Top Tabs layout that can be used with expo router.
 * Uses the custom TopTabsBar component by default.
 */
const TopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

// Set custom tab bar as default
TopTabs.defaultProps = {
  tabBar: (props: MaterialTopTabBarProps) => <TopTabsBar {...props} />
};

export default TopTabs;
