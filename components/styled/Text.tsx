import { Text as BaseText, TextProps } from "react-native-paper";

export default function Text({
  children,
  style,
  ...props
}: TextProps<typeof BaseText>) {
  const customStyles = {
    fontFamily: "",
    // Noto font is hiding the top of text , FIXME later, this is a termporarly solution
  };

  return (
    <BaseText {...props} style={[customStyles, style]}>
      {children}
    </BaseText>
  );
}
