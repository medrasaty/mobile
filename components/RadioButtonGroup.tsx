import {
  FlatList,
  FlatListProps,
  ScrollView,
  View,
  ViewProps,
} from "react-native";
import {
  Dialog,
  DialogProps,
  Divider,
  RadioButton,
  RadioButtonProps,
} from "react-native-paper";
import RadioTextButton, { RadioTextButtonProps } from "./RadioTextButton";
import { debugStyle } from "@/constants/styels";

export type RadioButtonGroupChoiceType = {
  value: string;
  title: string;
};

type RadioButtonGroupProps<T> = {
  choices: RadioButtonGroupChoiceType[];
  currentValue: RadioButtonGroupChoiceType["value"];
  onChoicePress: (choice: RadioButtonGroupChoiceType) => void;
  radioButtonProps?: Omit<Omit<RadioTextButtonProps, "value">, "title">;
} & Omit<Omit<FlatListProps<T>, "renderItem">, "data">;

/**
 * Display group of radio buttons.
 * @param choices : RadioButtonGroupChoiceType {
          value: string;
          title: string;
   };

 * @param currentValue: value of current choice RadioButtonGroupChoiceType['value']
 * @param onChoicePress: (choice: RadioButtonGroupChoiceType) => void; called for each choice.

 * @todo{explain it more}
 */

export default function RadioButtonGroup<T>({
  choices,
  currentValue,
  onChoicePress,
  radioButtonProps,
  ...props
}: RadioButtonGroupProps<T>) {
  const renderItem = ({ item }: { item: RadioButtonGroupChoiceType }) => {
    return (
      // TODO REDESIGNME: no need to pass full item , only value is important
      // also consider adding typescript automatic detection for values
      <RadioTextButton
        status={currentValue === item.value ? "checked" : "unchecked"}
        onPress={() => onChoicePress(item)}
        title={item.title}
        value={item.value}
        {...radioButtonProps}
      />
    );
  };

  // TODO: Fix typescript warning.
  return (
    <FlatList
      renderItem={renderItem}
      data={choices}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}
