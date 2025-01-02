import { ThemedText, ThemedTextProps } from "@/components/ThemedText";
import { debugStyle } from "@/constants/styels";
import { Pressable, PressableProps, View } from "react-native";

import { RadioButton, RadioButtonProps } from "react-native-paper";

export type RadioTextButtonProps = {
  title: string;
  titleProps?: ThemedTextProps<any>;
  titleVariant?: ThemedTextProps<any>["variant"];
  style?: PressableProps["style"];
} & RadioButtonProps;

const RadioTextButton = ({
  title,
  titleVariant = "titleSmall",
  titleProps,
  onPress,
  style,
  ...RadioButtonProps
}: RadioTextButtonProps) => {
  // FIX: fix typescript error
  return (
    <Pressable
      onPress={onPress}
      style={[style, { flexDirection: "row", alignItems: "center", gap: 8 }]}
    >
      <RadioButton onPress={onPress} {...RadioButtonProps} />
      <ThemedText variant={titleVariant} {...titleProps}>
        {title}
      </ThemedText>
    </Pressable>
  );
};

export default RadioTextButton;
