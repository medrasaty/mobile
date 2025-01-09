import { containerPaddings, debugStyle } from "@/constants/styels";
import { ThemedText } from "@components/ThemedText";
import { useMemo } from "react";
import { View, ViewProps } from "react-native";
import { Switch, SwitchProps, TextProps } from "react-native-paper";

type ToggleOptionProps<T> = {
  /**
   * Switch lable
   */
  label: string;
  /**
   * label props , TextProps without children
   */
  labelProps?: Omit<TextProps<T>, "children">;
  /**
   * Display small text beneeth label.
   */
  helperText?: string;
  /**
   * Whether to apply container paddings or not
   * @default false
   */

  helperTextProps?: Omit<TextProps<T>, "children">;
  container?: boolean;
} & SwitchProps;

export default function SwitchOption<T>({
  label,
  labelProps,
  container = false,
  helperText = "",
  helperTextProps,
  ...props
}: ToggleOptionProps<T>) {
  const containerStyle = useMemo(
    () => (container ? containerPaddings : null),
    [container]
  );
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          marginBottom: 16,
        },
        containerStyle,
      ]}
    >
      {/* Avoid overflow text and make it wrap to the next line */}
      <View style={{ width: "80%" }}>
        {/* Label text */}
        <ThemedText {...labelProps}>{label}</ThemedText>
        {/* Helper text */}
        {helperText && (
          <ThemedText color="gray" variant="labelSmall" {...helperTextProps}>
            {helperText}
          </ThemedText>
        )}
      </View>
      <Switch {...props} />
    </View>
  );
}
