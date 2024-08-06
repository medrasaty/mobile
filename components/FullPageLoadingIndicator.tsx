import View from "./styled/View";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function FullPageLoadingIndicator() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={theme.colors.secondary} size={30} />
    </View>
  );
}
