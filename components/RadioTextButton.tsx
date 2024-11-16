import { ThemedText, ThemedTextProps } from "@/components/ThemedText";
import { Pressable } from "react-native";

import { RadioButton, RadioButtonProps } from "react-native-paper";

export type RadioTextButtonProps = {
  title: string;
  titleProps?: ThemedTextProps<any>;
  titleVariant?: ThemedTextProps<any>["variant"];
} & RadioButtonProps;

const RadioTextButton = ({
  title,
  titleVariant = "titleSmall",
  titleProps,
  onPress,
  ...RadioButtonProps
}: RadioTextButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    >
      <RadioButton onPress={onPress} {...RadioButtonProps} />
      <ThemedText variant={titleVariant} {...titleProps}>
        {title}
      </ThemedText>
    </Pressable>
  );
};

export default RadioTextButton;
