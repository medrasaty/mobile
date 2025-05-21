import { FlashList, FlashListProps } from "@shopify/flash-list";
import { UseQueryResult } from "@tanstack/react-query";
import { View } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import { FullPageNetworkError, NetworkErrorProps } from "./NetworkError";
import ServerView from "./ServerView";
import React, { forwardRef, Ref } from "react";

type MultiQueryScreenListProps<T> = {
  headerStatus: UseQueryResult["status"];
  dataStatus: UseQueryResult["status"];
} & FlashListProps<T> &
  NetworkErrorProps;

/** Handle rendering list with two async queries, header, and the actual data,
 * The entire list will not be rendered until the header query is loaded.
 * Data will also be in loading state until fully loaded.
 */
const MultiQueryScreenList = forwardRef(function MultiQueryScreenList<T>(
  {
    headerStatus,
    dataStatus,
    onRetry,
    message: errorMessage,
    data,
    ListHeaderComponent,
    ...props
  }: MultiQueryScreenListProps<T>,
  ref: Ref<FlashList<T>>
) {
  // Show loading indicator if header data is still loading
  if (headerStatus === "pending") {
    return <FullPageLoadingIndicator />;
  }

  // Show error view if there's an error with the header data
  if (headerStatus === "error") {
    return <FullPageNetworkError onRetry={onRetry} message={errorMessage} />;
  }

  // Create footer component - show loading or error state for data
  const renderFooter = () => {
    if (dataStatus !== "success") {
      return (
        <View style={{ margin: 20 }}>
          <ServerView status={dataStatus} />
        </View>
      );
    }
    return null;
  };

  // Render the FlashList with optimized props to prevent flickering
  return (
    <FlashList 
      ref={ref} 
      ListFooterComponent={renderFooter}
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      // Optimize image handling
      removeClippedSubviews={false}
      {...props}
    />
  );
});

export default MultiQueryScreenList;
