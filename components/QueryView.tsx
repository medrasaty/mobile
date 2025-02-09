import { QueryOptions, UseQueryResult } from "@tanstack/react-query";
import { View, ViewProps } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import NetworkError, { FullPageNetworkError } from "./NetworkError";
import Page from "./Page";
import CenterPage from "./CenterPage";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";

type QueryViewProps = {
  query: UseQueryResult;
  errorMessage?: string;
} & ViewProps;

/**
 * Provide loading indicator when loading is true, error message and retry button,
 * and finally the content when none of the above are present
 */

const QueryView = ({ query, errorMessage, ...props }: QueryViewProps) => {
  const { status, refetch } = query;
  return (
    <View {...props}>
      {status === "pending" ? (
        <LoadingIndicator />
      ) : status === "error" ? (
        <NetworkError onRetry={refetch} message={errorMessage} />
      ) : (
        props.children
      )}
    </View>
  );
};

/**
 *
 * React Query page, it is the same as server view accept that
 * you don't need to pass status and onRetry, just the queryResult return from useQuery.
 *
 * @returns full page server view
 */

export const QueryPage = ({
  query,
  errorMessage,
  ...props
}: QueryViewProps) => {
  const { status, refetch } = query;
  return (
    <Page {...props}>
      {status === "pending" ? (
        <FullPageLoadingIndicator />
      ) : status === "error" ? (
        <FullPageNetworkError onRetry={refetch} message={errorMessage} />
      ) : (
        props.children
      )}
    </Page>
  );
};

export default QueryView;
