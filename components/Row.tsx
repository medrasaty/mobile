import { ThemedText } from "@/components/ThemedText";
import { ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

type RowProps = {} & ViewProps;

export default function Row(props: RowProps) {
  return (
    <ThemedView style={[props.style, { flexDirection: "row" }]} {...props}>
      {props.children}
    </ThemedView>
  );
}
