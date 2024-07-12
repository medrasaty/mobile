import { Text as BaseText, TextProps } from "react-native-paper";

export default function Text({ children, style, ...props }: TextProps<typeof BaseText>) {
  return (
    <BaseText
      {...props}
      style={[style]}
    >
      {children}
    </BaseText>
  );
}
