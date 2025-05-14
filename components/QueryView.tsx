import { QueryOptions, UseQueryResult } from "@tanstack/react-query";
import { View, ViewProps } from "react-native";
import LoadingIndicator from "./LoadingIndicator";
import NetworkError, { FullPageNetworkError } from "./NetworkError";
import Page from "./Page";
import CenterPage from "./CenterPage";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import Toast  from "@/lib/toast";

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
 * React Query page component that handles loading, error, and success states.
 * It wraps the content in a Page component and provides appropriate UI based on query status.
 *
 * @param {Object} props - Component props
 * @param {UseQueryResult} props.query - The query result from useQuery hook
 * @param {string} [props.errorMessage] - Custom error message to display
 * @returns {JSX.Element} Full page view with query-dependent content
 */
export const QueryPage = ({
  query,
  errorMessage,
  ...props
}: QueryViewProps): JSX.Element => {
  const { status, refetch } = query;

  const renderContent = () => {
    switch (status) {
      case "pending":
        if (query.data === undefined) {
          return <FullPageLoadingIndicator />;
        }
      case "error":
        // This prevent the error message from being displayed when query has data.
        if (query.data === undefined) {
          return <FullPageNetworkError onRetry={refetch} message={errorMessage} />;
        }
      default:
        return props.children;
    }
  };

  return <Page {...props}>{renderContent()}</Page>;
};

export default QueryPage;
