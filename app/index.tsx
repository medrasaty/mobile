import { registerRootComponent } from "expo";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <Box text="البداية" />
        <Box text="الوسط" />
        <Box text="النهاية" />
      </View>
    </View>
  );
}

function Box({ text }: { text: string }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={{ fontFamily: "Cario" }}>{text}</Text>
    </View>
  );
}

registerRootComponent(Index);

