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
import { Appbar, Menu } from "react-native-paper";
import BlackListUserCell from "../components/BlackListUserCell";
import { useInfiniteBlackListUsers } from "../queries";
import { InfiniteData } from "@tanstack/react-query";
import { CursorPaginatedResponse } from "@/types/responses";
import { BlackListUser } from "../types";
import { useVisibleV2 } from "@/hooks/useVisible";
import { UnblockAllMenuItem } from "../components/UnblockAllDialog";

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
  const [menuVisible, showMenu, hideMenu] = useVisibleV2(false);

  return (
    <AppBar title={t("blacklist")}>
      <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
      <Menu
        visible={menuVisible}
        onDismiss={hideMenu}
        anchorPosition="bottom"
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={showMenu}
          />
        }
      >
        <UnblockAllMenuItem onPress={hideMenu} />
      </Menu>
    </AppBar>
  );
};

/**
 * List component for displaying blacklisted users with infinite scrolling
 */
export const BlackListUsersList = () => {
  const { searchValue } = useSearchContext();
  const infiniteQuery = useInfiniteBlackListUsers({ search: searchValue });

  // Extract flat array of users from paginated response
  const getItems = useMemo(() => (
    (data: InfiniteData<CursorPaginatedResponse<BlackListUser>, unknown> | undefined): BlackListUser[] => {
      if (!data) return [];
      return data.pages.flatMap(page => page.results);
    }
  ), []);

  // Render loading indicator when fetching more data
  const renderFooter = () => 
    infiniteQuery.isFetchingNextPage ? <ListFooterActivityIndicator /> : null;

  return (
    <InfiniteScreenListV3<InfiniteData<CursorPaginatedResponse<BlackListUser>, unknown>, BlackListUser>
      q={infiniteQuery}
      getItems={getItems}
      onFetchNextPage={() => infiniteQuery.fetchNextPage()}
      renderItem={({ item }) => (
        <BlackListUserCell user={item} />
      )}
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
