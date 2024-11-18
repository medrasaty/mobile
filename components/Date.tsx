import { d } from "@/lib/dates";
import { View, ViewProps } from "react-native";
import { TextProps, useTheme } from "react-native-paper";
import { ThemedText } from "./ThemedText";

type DateProps<T> = {
  date: string | Date;
} & Omit<TextProps<T>, "children">;

export default function Date<T>({ date, ...props }: DateProps<T>) {
  const theme = useTheme();
  return (
    <ThemedText color={theme.colors.primary} {...props}>
      {d(date).fromNow()}
    </ThemedText>
  );
}
