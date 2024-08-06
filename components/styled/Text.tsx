import { Text as BaseText, TextProps } from "react-native-paper";

export default function Text({
  children,
  ...props
}: TextProps<typeof BaseText>) {
  return <BaseText {...props}>{children}</BaseText>;
}
