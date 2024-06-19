import { Text, type TextProps } from "react-native";
import { useTheme } from "react-native-paper";

export type ThemedTextProps = TextProps;

export function ThemedText({ style, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[style, { fontFamily: theme.fonts.default.fontFamily }]}
      {...rest}
    />
  );
}
