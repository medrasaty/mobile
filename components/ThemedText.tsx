import { useTheme } from "react-native-paper";
import { Text as BaseText, type TextProps } from "react-native-paper";

export type ThemedTextProps = {
  link?: boolean;
  color?: string;
  bold?: boolean;
} & TextProps<any>;

export function ThemedText({
  link = false,
  color,
  bold = false,
  style,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const fontWeight = bold ? "bold" : "normal";
  color = color ? color : theme.colors.onSurface;

  return (
    <BaseText
      style={[
        style,
        {
          fontFamily: theme.fonts.default.fontFamily,
          color: color,
          fontWeight: fontWeight,
        },
      ]}
      {...rest}
    />
  );
}
