/**
 * ThemedText is a wrapper around react-native-paper's Text component that
 * provides easy theming, optional link styling, bold text, and pressable support.
 *
 * Props:
 * - link: If true, styles the text as a link (primary color, underline).
 * - color: Custom text color. If not provided, uses theme's onSurface color.
 * - bold: If true, applies bold font weight.
 * - onPress: If provided and noInteraction is false, wraps the text in a Pressable.
 * - pressableStyle: Style for the Pressable wrapper.
 * - pressableProps: Additional props for the Pressable wrapper (except 'children' and 'style').
 * - noInteraction: If true (default), disables pressable behavior even if onPress is provided.
 * - ...rest: All other TextProps are passed to the underlying Text component.
 */

import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Text as BaseText, TextProps } from "react-native-paper";

/**
 * Props for ThemedText component.
 */
export type ThemedTextProps = {
  /** If true, styles the text as a link (primary color, underline). */
  link?: boolean;
  /** Custom text color. If not provided, uses theme's onSurface color. */
  color?: string;
  /** If true, applies bold font weight. */
  bold?: boolean;
  /** onPress handler. If provided and noInteraction is false, wraps in Pressable. */
  onPress?: () => void;
  /** Style for the Pressable wrapper. */
  pressableStyle?: StyleProp<ViewStyle>;
  /** Additional props for the Pressable wrapper (except 'children' and 'style'). */
  pressableProps?: Omit<React.ComponentProps<typeof Pressable>, 'children' | 'style'>;
  /** If true (default), disables pressable behavior even if onPress is provided. */
  noInteraction?: boolean;
} & TextProps<any>;

/**
 * ThemedText component for consistent themed text rendering.
 */
export function ThemedText({
  link = false,
  color,
  bold = false,
  style,
  onPress,
  pressableStyle,
  pressableProps,
  noInteraction = true,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  // Determine font weight
  const fontWeight = bold ? "bold" : "normal";

  // Determine text color: use provided color, else theme's onSurface, unless link is true
  color = color ? color : theme.colors.onSurface;
  color = !link ? color : theme.colors.primary;

  // Construct the text element with appropriate styles
  const TextElement = (
    <BaseText
      style={[
        {
          fontFamily: theme.fonts.default.fontFamily,
          color: color,
          fontWeight: fontWeight,
          textDecorationLine: link ? "underline" : "none",
        },
        style,
      ]}
      {...rest}
    />
  );

  // If onPress is provided and noInteraction is false, wrap in Pressable
  if (onPress && !noInteraction) {
    return (
      <Pressable
        onPress={onPress}
        style={pressableStyle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        {...pressableProps}
      >
        {TextElement}
      </Pressable>
    );
  }

  // Otherwise, just render the text element
  return TextElement;
}
