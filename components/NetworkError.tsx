import { ThemedText } from "./ThemedText";
import { useTranslation } from "react-i18next";
import {  View, ViewProps } from "react-native";
import { Button } from "react-native-paper";
import Page from "./Page";
import CenterPage from "./CenterPage";
import ErrorView from "./ErrorView"

export type NetworkErrorProps = {
  message?: string;
  onRetry?: () => void;
} & ViewProps;

/**
 * @deprecated Use ErrorView component instead.
 * This component is deprecated and will be removed in future versions.
 * Please use the ErrorView component for displaying error states with retry functionality.
 * 
 * @param {NetworkErrorProps} props - Component props
 * @param {string} [props.message="Something went wrong!"] - Error message to display
 * @param {() => void} [props.onRetry] - Function to call when retry button is pressed
 * @param {ViewProps} props.style - Additional styles for the container
 * @returns {React.ReactElement} A component displaying an error message with retry option
 */
const NetworkError = ({
  message = "Something went wrong!",
  onRetry,
  style,
  ...props
}: NetworkErrorProps): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <View style={[style, { gap: 9, alignItems: "center" }]} {...props}>
      <ThemedText>{message}</ThemedText>
      <Button onPress={onRetry}>{t("retry")}</Button>
    </View>
  );
};

export const FullPageNetworkError: React.FC<NetworkErrorProps> = ({ message: error, onRetry }) => (
  <Page>
    <CenterPage>
      <ErrorView error={error} onRetry={onRetry} />
    </CenterPage>
  </Page>
);

export default NetworkError;
