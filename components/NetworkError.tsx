import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, ViewProps } from "react-native";
import { Button, useTheme } from "react-native-paper";

export type NetworkErrorProps = {
  message?: string;
  onRetry?: () => void;
} & ViewProps;

const NetworkError = ({
  message = "Something went wrong!",
  onRetry,
  style,
  ...props
}: NetworkErrorProps) => {
  const { t } = useTranslation();

  return (
    <View style={[style, { gap: 9 }]} {...props}>
      <ThemedText>{message}</ThemedText>
      <Button onPress={onRetry}>{t("retry")}</Button>
    </View>
  );
};

export default NetworkError;
