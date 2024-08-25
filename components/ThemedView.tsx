import { View, type ViewProps, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type ThemedViewProps = {
  direction?: "column" | "row";
} & ViewProps;

export function ThemedView({
  direction = "column",
  ...props
}: ThemedViewProps) {
  const {
    colors: { background },
  } = useTheme();

  return (
    <View
      style={[
        direction === "row" && styles.row,
        { backgroundColor: background },
        props.style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
