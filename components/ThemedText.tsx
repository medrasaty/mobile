import { useTheme } from "react-native-paper";
import { Text as BaseText, type TextProps } from "react-native-paper";

export type ThemedTextProps = TextProps<any>;

export function ThemedText({ style, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <BaseText
      style={[style, { fontFamily: theme.fonts.default.fontFamily }]}
      {...rest}
    />
  );
}
