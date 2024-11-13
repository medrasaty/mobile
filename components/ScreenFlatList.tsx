import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, FlatListProps, FlatList, View } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import NetworkError, { NetworkErrorProps } from "./NetworkError";
import { StyleSheet } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import LoadingIndicator from "./LoadingIndicator";
import { useCallback } from "react";

type ScreenListProps<T> = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
} & FlashListProps<T>;

/**
 * @deprecated{use ScreenListV2 instead with same API interface}
 */
export default function ScreenList<T>({
  isPending,
  isError,
  onRetry,
  errorMessage,
  data,
  ...listProps
}: ScreenListProps<T>) {
  return (
    <>
      {isPending ? (
        <FullPageLoadingIndicator />
      ) : data ? (
        <FlashList data={data} {...listProps} />
      ) : (
        <ScreenError message={errorMessage} onRetry={onRetry} />
      )}
    </>
  );
}

type ScreenListV2Props<T> = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
  infinite?: boolean;
} & FlashListProps<T>;

export function ScreenListV2<T>({
  isPending,
  isError,
  onRetry,
  errorMessage,
  data,
  ListEmptyComponent,
  infinite = false,
  ListFooterComponent,
  ...listProps
}: ScreenListV2Props<T>) {
  const renderEmptyList = () => {
    if (isPending) {
      return <ScreenLoadingIndicator />;
    }

    if (isError) {
      return <ScreenError message={errorMessage} onRetry={onRetry} />;
    }

    // Empty list provided by user
    return ListEmptyComponent;
  };

  const renderFooter = () => {
    if (!infinite) {
      return ListFooterComponent;
    }
  };

  return (
    <>
      <FlashList
        ListEmptyComponent={renderEmptyList()}
        ListFooterComponent={renderFooter()}
        data={data ?? []}
        {...listProps}
      />
    </>
  );
}

export const ScreenError = (props: NetworkErrorProps) => {
  return (
    <ThemedView style={styles.screenErrorContainer}>
      <NetworkError {...props} />
    </ThemedView>
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
