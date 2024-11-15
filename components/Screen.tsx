import { View, ViewProps } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import NetworkError, { NetworkErrorProps } from "./NetworkError";
import LoadingIndicator from "./LoadingIndicator";
import { StyleSheet } from "react-native";
import Page from "./Page";
import CenterPage from "./CenterPage";

type ScreenProps = {
  isPending?: boolean;
  isError?: boolean;
  onRetry: () => void;
  errorMessage?: string;
};

/**
 * Provide basic abscraction to loading screen and error handling ( refetch )
 *
 */

const ScreenPage = ({
  isPending,
  isError,
  onRetry,
  errorMessage,
  ...props
}: ScreenProps & ViewProps) => {
  return (
    <>
      {isPending ? (
        <FullPageLoadingIndicator />
      ) : isError ? (
        <ScreenError onRetry={onRetry} message={errorMessage} />
      ) : (
        <Page {...props}>{props.children}</Page>
      )}
    </>
  );
};

export const ScreenError = (props: NetworkErrorProps) => {
  return (
    <Page style={styles.screenErrorContainer}>
      <NetworkError {...props} />
    </Page>
  );
};

export const ScreenLoadingIndicator = () => {
  return (
    <View style={styles.loadingIndicator}>
      <LoadingIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 10,
  },
});

export default ScreenPage;
