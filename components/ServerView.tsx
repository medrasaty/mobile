import { UseQueryResult } from "@tanstack/react-query";
import { View, ViewProps } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import NetworkError, { FullPageNetworkError } from "./NetworkError";
import Page from "./Page";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";

type ServerViewProps = {
  status: UseQueryResult["status"];
  onRetry?: () => void;
  errorMessage?: string;
} & ViewProps;

/**
 * Provide loading indicator when loading is true, error message and retry button,
 * and finally the content when none of the above are present
 */

const ServerView = ({
  status,
  onRetry,
  errorMessage,
  ...props
}: ServerViewProps) => {
  return (
    <View {...props}>
      {status === "pending" ? (
        <LoadingIndicator />
      ) : status === "error" ? (
        <NetworkError onRetry={onRetry} message={errorMessage} />
      ) : (
        props.children
      )}
    </View>
  );
};

/**
 *
 * @returns full page server view
 */

export const ServerPage = ({
  status,
  onRetry,
  errorMessage,
  ...props
}: ServerViewProps) => {
  return (
    <Page {...props}>
      {status === "pending" ? (
        <FullPageLoadingIndicator />
      ) : status === "error" ? (
        <FullPageNetworkError onRetry={onRetry} message={errorMessage} />
      ) : (
        props.children
      )}
    </Page>
  );
};

export default ServerView;
