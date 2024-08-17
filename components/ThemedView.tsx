import { View, type ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

export function ThemedView({ style, ...props }: ViewProps) {
  const {
    colors: { background },
  } = useTheme();

  return <View style={[{ backgroundColor: background }, style]} {...props} />;
}
