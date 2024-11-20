import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, ViewProps } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Page from "./Page";
import CenterPage from "./CenterPage";

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
    <View style={[style, { gap: 9, alignItems: "center" }]} {...props}>
      <ThemedText>{message}</ThemedText>
      <Button onPress={onRetry}>{t("retry")}</Button>
    </View>
  );
};

export const FullPageNetworkError = (props: NetworkErrorProps) => {
  return (
    <Page>
      <CenterPage>
        <NetworkError {...props} />
      </CenterPage>
    </Page>
  );
};

export default NetworkError;
