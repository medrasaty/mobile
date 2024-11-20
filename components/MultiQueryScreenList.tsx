import { FlashList, FlashListProps } from "@shopify/flash-list";
import { UseQueryResult } from "@tanstack/react-query";
import { View, ViewProps } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import { FullPageNetworkError, NetworkErrorProps } from "./NetworkError";
import LoadingIndicator from "./LoadingIndicator";
import ServerView from "./ServerView";
import { Divider } from "react-native-paper";
import ListFooterActivityIndicator from "./ListFooterActivityIndicator";
import { debugStyle } from "@/constants/styels";

type MultiQueryScreenListProps<T> = {
  headerStatus: UseQueryResult["status"];
  dataStatus: UseQueryResult["status"];
} & FlashListProps<T> &
  NetworkErrorProps;

/** Handle rendering list with two async queries, header, and the actual data,
 * The entire list will not be rendered untile the header query is loaded.
 # data will also be in loading state until fully loaded
 * 
 *
 */
export default function MultiQueryScreenList<T>({
  headerStatus,
  dataStatus,
  onRetry,
  message: errorMessage,
  ...props
}: MultiQueryScreenListProps<T>) {
  if (headerStatus === "pending") {
    return <FullPageLoadingIndicator />;
  }

  if (headerStatus === "error") {
    return <FullPageNetworkError onRetry={onRetry} message={errorMessage} />;
  }

  const renderFooter = () => {
    return (
      <View style={{ margin: 20 }}>
        <ServerView status={dataStatus} />
      </View>
    );
  };

  return <FlashList ListFooterComponent={renderFooter} {...props} />;
}
