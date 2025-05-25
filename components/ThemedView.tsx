/**
 * @deprecated ThemedView is deprecated.
 * Please use the default View component or the styled/View component instead.
 */
import { View, type ViewProps, StyleSheet } from "react-native";

/**
 * @deprecated ThemedView is deprecated.
 * Please use the default View component or the styled/View component instead.
 */
export function ThemedView({
  direction = "column",
  style,
  ...props
}: { direction?: "column" | "row" } & ViewProps) {
  // Deprecated: No longer applies theme. Use View or styled/View instead.
  return <View style={[style, direction === "row" && styles.row]} {...props} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
