import { FlexStyle, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

type RowProps = {
  alignItems?: "flex-start" | "flex-end" | "center";
  align?: "flex-start" | "flex-end" | "center";
  gap?: FlexStyle["gap"];
} & ViewProps;

export default function Row({
  alignItems = "flex-start",
  align,
  gap,
  style,
  ...props
}: RowProps) {
  return (
    <ThemedView
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: alignItems ?? align,
          gap: gap ?? 0,
        },
      ]}
      {...props}
    >
      {props.children}
    </ThemedView>
  );
}
