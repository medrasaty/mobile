import { ThemedText } from "@components/ThemedText";
import { View, ViewProps } from "react-native";
import {
  ToggleButton,
  ToggleButtonProps,
  Switch,
  SwitchProps,
  TextProps,
} from "react-native-paper";

type ToggleOptionProps<T> = {
  label: string;
  labelProps?: Omit<TextProps<T>, "children">;
} & SwitchProps;

export default function SwitchOption<T>({
  label,
  labelProps,
  ...props
}: ToggleOptionProps<T>) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText {...labelProps}>{label}</ThemedText>
      <Switch {...props} />
    </View>
  );
}
