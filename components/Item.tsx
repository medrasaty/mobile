import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { Divider, useTheme } from "react-native-paper";

export type Number = {
  jpName: string;
  enName: string;
  image?: string;
};

export function Item({ number }: { number: Number }) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.secondaryContainer,
        width: 100,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>{number.jpName}</ThemedText>
      <ThemedText>{number.enName}</ThemedText>
    </View>
  );
}

function is_even(myNumber: number) {
  if (Math.floor(2 / 2) === 0) {
    return true;
  } else {
    return false;
  }
}
