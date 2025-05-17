import { ThemedView } from "@/components/ThemedView";
import { FlatListProps, FlatList, View } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { UseQueryResult } from "@tanstack/react-query";
import { ScreenError, ScreenLoadingIndicator } from "./Screen";

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

/**
 * A versatile list component leveraging FlashList that handles loading, error, empty, and infinite-scroll states.
 * @deprecated use ScreenListV3 instead
 *
 * @template T - The type of the items in the list.
 *
 * @param props.isPending - Whether the list is currently loading. If true, displays a loading indicator.
 * @param props.isError - Whether the list encountered an error. If true, displays an error view.
 * @param props.onRetry - Callback invoked when the error view retry action is triggered.
 * @param props.errorMessage - The message to display in the error view when an error occurs.
 * @param props.data - The array of items to render in the list. Falls back to an empty array if undefined.
 * @param props.ListEmptyComponent - A React element to render when the list is empty and not loading or errored.
 * @param props.infinite - If true, enables infinite scrolling by rendering a footer component.
 * @param props.ListFooterComponent - A React element to render as the list footer, typically for loading more items.
 * @param props.listProps - Additional props forwarded to the underlying FlashList component.
 *
 * @returns A FlashList configured with built-in loading, error, empty, and optional infinite-scroll behaviors.
 */
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

type ScreenFlatListV2Props<T> = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
  infinite?: boolean;
} & FlatListProps<T>;

export function ScreenFlatListV2<T>({
  isPending,
  isError,
  onRetry,
  errorMessage,
  data,
  ListEmptyComponent,
  infinite = false,
  ListFooterComponent,
  ...listProps
}: ScreenFlatListV2Props<T>) {
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
      <FlatList
        ListEmptyComponent={renderEmptyList()}
        ListFooterComponent={renderFooter()}
        data={data ?? []}
        {...listProps}
      />
    </>
  );
}

type ScreenListV3Props<T> = {
  q: UseQueryResult<T>;
} & Omit<FlashListProps<T>, "data">;

export function ScreenListV3<T>({
  q,
  ListEmptyComponent,
  ...listProps
}: ScreenListV3Props<T>) {
  const renderEmptyList = () => {
    if (q.isPending) {
      return <ScreenLoadingIndicator />;
    }

    if (q.isError) {
      return (
        <ScreenError message={"something went wrong"} onRetry={q.refetch} />
      );
    }

    // Empty list provided by user
    return ListEmptyComponent;
  };

  const { data } = q;

  return (
    <FlashList
      ListEmptyComponent={renderEmptyList()}
      data={data ?? []}
      {...listProps}
    />
  );
}

/**
 * A version of ScreenListV3 that handles paginated responses
 */
type PaginatedScreenListV3Props<T> = {
  q: UseQueryResult<{ results: T[] }>;
} & Omit<FlashListProps<T>, "data">;

export function PaginatedScreenListV3<T>({
  q,
  ListEmptyComponent,
  ...listProps
}: PaginatedScreenListV3Props<T>) {
  const renderEmptyList = () => {
    if (q.isPending) {
      return <ScreenLoadingIndicator />;
    }

    if (q.isError) {
      return (
        <ScreenError message={"something went wrong"} onRetry={q.refetch} />
      );
    }

    // Empty list provided by user
    return ListEmptyComponent;
  };

  const data = q.data?.results ?? [];

  return (
    <FlashList
      ListEmptyComponent={renderEmptyList()}
      data={data}
      {...listProps}
    />
  );
}

/**
 * A component specifically designed for infinite queries with pagination support.
 * 
 * @template T - The type of the infinite query data structure (typically InfiniteData from React Query)
 * @template R - The type of individual items to be rendered in the list
 * 
 * @example
 * ```tsx
 * // Example usage with useInfiniteData hook
 * const infiniteQuery = useInfiniteBlackListUsers({ search: searchValue });
 * 
 * const getItems = (data) => {
 *   if (!data) return [];
 *   return data.pages.map(page => page.results).flat();
 * };
 * 
 * return (
 *   <InfiniteScreenListV3
 *     q={infiniteQuery}
 *     getItems={getItems}
 *     onFetchNextPage={() => infiniteQuery.fetchNextPage()}
 *     renderItem={({ item }) => <ItemComponent item={item} />}
 *     estimatedItemSize={100}
 *   />
 * );
 * ```
 */
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type InfiniteScreenListV3Props<T, R> = {
  /**
   * The infinite query result from React Query's useInfiniteQuery hook
   */
  q: UseInfiniteQueryResult<T>;
  
  /**
   * Function to extract the flat array of items from the paginated data structure
   * @param data - The data from the infinite query result
   * @returns An array of items to be rendered in the list
   */
  getItems: (data: T | undefined) => R[];
  
  /**
   * Callback function to load the next page of data
   * Typically calls the fetchNextPage method from the infinite query
   */
  onFetchNextPage: () => void;
} & Omit<FlashListProps<R>, "data" | "onEndReached">;

export function InfiniteScreenListV3<T, R>({
  q,
  getItems,
  ListEmptyComponent,
  onFetchNextPage,
  ...listProps
}: InfiniteScreenListV3Props<T, R>) {
  const renderEmptyList = () => {
    if (q.isPending) {
      return <ScreenLoadingIndicator />;
    }

    if (q.isError) {
      return (
        <ScreenError message={"something went wrong"} onRetry={q.refetch} />
      );
    }

    // Empty list provided by user
    return ListEmptyComponent;
  };

  const data = getItems(q.data);

  return (
    <FlashList
      ListEmptyComponent={renderEmptyList()}
      data={data}
      onEndReached={onFetchNextPage}
      {...listProps}
    />
  );
}

type ScreenFlatListV3Props<T> = {
  q: UseQueryResult<T>;
} & Omit<FlatListProps<T>, "data">;

export function ScreenFlatListV3<T>({
  q,
  ListEmptyComponent,
  ...props
}: ScreenListV3Props<T>) {
  const renderEmptyList = () => {
    if (q.isPending) {
      return <ScreenLoadingIndicator />;
    }

    if (q.isError) {
      return (
        <ScreenError message={"something went wrong"} onRetry={q.refetch} />
      );
    }

    // Empty list provided by user
    return ListEmptyComponent;
  };

  const { data } = q;

  return (
    <>
      <FlatList
        ListEmptyComponent={renderEmptyList()}
        data={data ?? []}
        {...props}
      />
    </>
  );
}
