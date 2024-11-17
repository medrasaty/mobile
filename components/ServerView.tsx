import { UseQueryResult } from "@tanstack/react-query";
import { View, ViewProps } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import NetworkError from "./NetworkError";

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

export default ServerView;
