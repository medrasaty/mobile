import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import Page from "@/components/Page";
import { InfiniteScreenListV3 } from "@/components/ScreenFlatList";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import { useMemo } from "react";
import { Appbar } from "react-native-paper";
import Sheet, { useSheetRef } from "@/components/Sheet";
import BlackListUserCell from "../components/BlackListUserCell";
import { useInfiniteBlackListUsers } from "../queries";
import { InfiniteData } from "@tanstack/react-query";
import { CursorPaginatedResponse } from "@/types/responses";
import { BlackListUser } from "../types";
import { ClearBlacklistItem } from "../components/UnblockAllDialog";
import EmptyView from "@/components/EmptyList";
import View from "@components/styled/View";

/**
 * Main screen for displaying and managing blacklisted users
 */
const BlackListScreen = () => {
  return (
    <SearchContextProvider>
      <Page>
        <BlackListAppbar />
        <BlackListUsersList />
      </Page>
    </SearchContextProvider>
  );
};

/**
 * Conditional app bar that switches between search and options mode
 */
export const BlackListAppbar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <OptionAppbar />;
};

/**
 * Standard app bar with search and options actions
 */
export const OptionAppbar = () => {
  const { setIsSearch } = useSearchContext();
  const sheetRef = useSheetRef();

  return (
    <>
      <AppBar title={t("blacklist")}>
        <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => sheetRef.current?.expand()}
        />
      </AppBar>
      <Sheet ref={sheetRef}>
        <View style={{ paddingVertical: 16 }} >
          <ClearBlacklistItem />
        </View>
      </Sheet>
    </>
  );
};

/**
 * List component for displaying blacklisted users with infinite scrolling
 */
export const BlackListUsersList = () => {
  const { searchValue } = useSearchContext();
  const infiniteQuery = useInfiniteBlackListUsers({ search: searchValue });

  // Extract flat array of users from paginated response
  const getItems = useMemo(
    () =>
      (
        data:
          | InfiniteData<CursorPaginatedResponse<BlackListUser>, unknown>
          | undefined
      ): BlackListUser[] => {
        if (!data) return [];
        return data.pages.flatMap((page) => page.results);
      },
    []
  );

  // Get users from the query data
  const users = getItems(infiniteQuery.data);
  const hasUsers = users.length > 0;

  // Render loading indicator when fetching more data
  const renderFooter = () =>
    infiniteQuery.isFetchingNextPage ? <ListFooterActivityIndicator /> : null;

  // Show empty view when there are no blacklisted users and not loading
  if (!hasUsers && !infiniteQuery.isLoading && !infiniteQuery.isError) {
    return (
      <EmptyView
        message={t("no_blacklisted_users")}
        secondaryMessage={t(
          "blacklist_empty_description",
          "Users you block will appear here"
        )}
        icon="account-cancel"
        iconSize={40}
        fullScreen={true}
        padding={24}
      />
    );
  }

  return (
    <InfiniteScreenListV3<
      InfiniteData<CursorPaginatedResponse<BlackListUser>, unknown>,
      BlackListUser
    >
      q={infiniteQuery}
      getItems={getItems}
      onFetchNextPage={() => infiniteQuery.fetchNextPage()}
      renderItem={({ item }) => <BlackListUserCell user={item} />}
      estimatedItemSize={100}
      ListFooterComponent={renderFooter()}
      keyExtractor={(item) => item.pk}
      refreshing={infiniteQuery.isRefetching}
      onRefresh={infiniteQuery.refetch}
      onEndReachedThreshold={0.5}
    />
  );
};

export default BlackListScreen;
