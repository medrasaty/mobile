import { Pressable, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Text as BaseText, TextProps } from "react-native-paper";

export type ThemedTextProps<T> = {
  link?: boolean;
  color?: string;
  bold?: boolean;
} & TextProps<T>;

export function ThemedText<T>({
  link = false,
  color,
  bold = false,
  style,
  ...rest
}: ThemedTextProps<T>) {
  const theme = useTheme();
  const fontWeight = bold ? "bold" : "normal";

  color = color ? color : theme.colors.onSurface;

  color = !link ? color : theme.colors.primary;

  const Wrapper = link ? TouchableOpacity : Pressable;

  return (
    <Wrapper>
      <BaseText
        style={[
          style,
          {
            fontFamily: theme.fonts.default.fontFamily,
            color: color,
            fontWeight: fontWeight,
            textDecorationLine: link ? "underline" : "none",
          },
        ]}
        {...rest}
      />
    </Wrapper>
  );
}
