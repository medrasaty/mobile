import { ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

type RowProps = {
  alignItems?: "flex-start" | "flex-end" | "center";
  align?: "flex-start" | "flex-end" | "center";
} & ViewProps;

export default function Row({
  alignItems = "flex-start",
  align,
  style,
  ...props
}: RowProps) {
  return (
    <ThemedView
      style={[style, { flexDirection: "row", alignItems: alignItems ?? align }]}
      {...props}
    >
      {props.children}
    </ThemedView>
  );
}
