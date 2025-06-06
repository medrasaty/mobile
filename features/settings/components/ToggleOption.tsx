import { containerPaddings, debugStyle } from "@/constants/styels";
import { ThemedText } from "@components/ThemedText";
import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";
import {
  Switch,
  SwitchProps,
  TextProps,
  TouchableRipple,
} from "react-native-paper";

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
  value: currentValue,
  onValueChange,
  ...props
}: ToggleOptionProps<T>) {
  const [value, setValue] = useState(currentValue);
  const containerStyle = useMemo(
    () => (container ? containerPaddings : null),
    [container]
  );

  /**
   * keep sync with current value updates.
   */
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  /**
   * Optemistically update switche state,
   * than you can
   */
  const handleChange = async () => {
    const newValue = !value;
    setValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <TouchableRipple onPress={handleChange}>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
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
        <Switch value={value} onValueChange={handleChange} {...props} />
      </View>
    </TouchableRipple>
  );
}
