import { ThemedView } from "@/components/ThemedView";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Drawer, useTheme } from "react-native-paper";

type Props = {
  /**
   * The label text of the item.
   */
  label:
    | string
    | ((props: { focused: boolean; color: string }) => React.ReactNode);
  /**
   * Icon to display for the `DrawerItem`.
   */
  icon?: (props: {
    focused: boolean;
    size: number;
    color: string;
  }) => React.ReactNode;
  /**
   * URL to use for the link to the tab.
   */
  to?: string;
  /**
   * Whether to highlight the drawer item as active.
   */
  focused?: boolean;
  /**
   * Function to execute on press.
   */
  onPress: () => void;
  /**
   * Color for the icon and label when the item is active.
   */
  activeTintColor?: string;
  /**
   * Color for the icon and label when the item is inactive.
   */
  inactiveTintColor?: string;
  /**
   * Background color for item when its active.
   */
  activeBackgroundColor?: string;
  /**
   * Background color for item when its inactive.
   */
  inactiveBackgroundColor?: string;
  /**
   * Color of the touchable effect on press.
   * Only supported on Android.
   *
   * @platform android
   */
  pressColor?: string;
  /**
   * Opacity of the touchable effect on press.
   * Only supported on iOS.
   *
   * @platform ios
   */
  pressOpacity?: number;
  /**
   * Style object for the label element.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style object for the wrapper element.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Whether label font should scale to respect Text Size accessibility settings.
   */
  allowFontScaling?: boolean;

  /**
   * Accessibility label for drawer item.
   */
  accessibilityLabel?: string;
  /**
   * ID to locate this drawer item in tests.
   */
  testID?: string;
};
export default function MaterialDrawerItem(props: Props) {
  const { colors } = useTheme();

  const {
    icon,
    label,
    labelStyle,
    to,
    focused = false,
    allowFontScaling,
    style,
    onPress,
    pressColor,
    pressOpacity,
    testID,
    accessibilityLabel,
    ...rest
  } = props;

  const color = focused ? colors.onSecondaryContainer : colors.onSurfaceVariant;

  const iconNode = icon ? icon({ size: 24, focused, color }) : null;

  return (
    <ThemedView collapsable={false} {...rest} style={[styles.container, style]}>
      <Drawer.Item
        testID={testID}
        onPress={onPress}
        style={[styles.wrapper]}
        active={focused}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ selected: focused }}
        label={label.toString()}
        icon={() => iconNode}
      ></Drawer.Item>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    overflow: "hidden",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    display: "flex",
  },
});
