import { useTheme } from "react-native-paper";
import { Text as BaseText, type TextProps } from "react-native-paper";

export type ThemedTextProps = {
  link?: boolean;
  color?: string;
} & TextProps<any>;

export function ThemedText({
  link = false,
  color,
  style,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <BaseText
      style={[
        style,
        { fontFamily: theme.fonts.default.fontFamily, color: color },
      ]}
      {...rest}
    />
  );
}
