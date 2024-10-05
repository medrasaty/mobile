import { View, type ViewProps, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type ThemedViewProps = {
  direction?: "column" | "row";
} & ViewProps;

export function ThemedView({
  direction = "column",
  style,
  ...props
}: ThemedViewProps) {
  const {
    colors: { surface },
  } = useTheme();

  return <View style={[style, direction === "row" && styles.row]} {...props} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
