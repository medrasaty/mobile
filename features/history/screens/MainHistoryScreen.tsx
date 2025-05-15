import Page from "@/components/Page";
import { useInfiniteHistory } from "../queries";
import QuestionHistoryCell, { QUESTION_HISTORY_CELL_HEIGHT } from "../components/QuestionHistoryCell";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import FilterOptionsView from "@/components/FilterOptionsView";
import { Appbar, Divider, IconButton, Menu, MenuItemProps } from "react-native-paper";
import { useTranslation } from "react-i18next";
import useClearWatchHistoryMutation from "../mutations";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoadingDialog from "@/components/LoadingDialog";
import useFilterOptions from "@/hooks/useFilterOptions";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import { InfiniteScreenListV3 } from "@/components/ScreenFlatList";
import { CursorPaginatedResponse } from "@/types/responses";
import { WatchHistory } from "../types";
import { InfiniteData } from "@tanstack/react-query";

const MainHistoryScreen = () => {
  return (
    <SearchContextProvider>
      <SnackbarProvider>
        <Page>
          <HistoryAppbar />
          <WatchHistoryList />
        </Page>
      </SnackbarProvider>
    </SearchContextProvider>
  );
};

export const WatchHistoryList = () => {
  const { t } = useTranslation();
  const { options, currentFilter, onFilterChange } = useFilterOptions([
    { label: t("Newest"), value: "-watched_at" },
    { label: t("Oldest"), value: "watched_at" },
  ]);

  const { searchValue } = useSearchContext();

  const renderHeader = () => {
    return (
      <FilterOptionsView
        currentFilter={currentFilter}
        filterOptions={options}
        onFilterChange={onFilterChange}
      />
    );
  };

  const infiniteQuery = useInfiniteHistory({
    ordering: currentFilter,
    search: searchValue,
  });

  const getItems = (data: InfiniteData<CursorPaginatedResponse<WatchHistory>, unknown> | undefined): WatchHistory[] => {
    if (!data) return [];
    return data.pages.map((page) => page.results).flat();
  };

  const renderFooter = () => {
    if (infiniteQuery.isFetchingNextPage) return <ListFooterActivityIndicator />;
  };

  return (
    <InfiniteScreenListV3<InfiniteData<CursorPaginatedResponse<WatchHistory>, unknown>, WatchHistory>
      q={infiniteQuery}
      getItems={getItems}
      onFetchNextPage={() => infiniteQuery.fetchNextPage()}
      renderItem={({ item }) => (
        <QuestionHistoryCell history={item} />
      )}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={EmptyHistory}
      onEndReachedThreshold={1}
      estimatedItemSize={QUESTION_HISTORY_CELL_HEIGHT}
      refreshing={infiniteQuery.isRefetching}
      onRefresh={infiniteQuery.refetch}
      overScrollMode="always"
    />
  );
};

const HistoryAppbar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <OptionsAppbar />;
};

export const OptionsAppbar = () => {
  const { setIsSearch } = useSearchContext();
  return (
    <AppBar title={t("Watch_history")}>
      <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
      <HistoryAppbarOptions />
    </AppBar>
  );
};

export const HistoryAppbarOptions = () => {
  const {
    mutate: clear,
    isPending,
    isSuccess,
  } = useClearWatchHistoryMutation();
  const [confirmVisible, showConfirm, hideConfirm] = useVisibleV2(false);
  const [menuVisible, showMenu, hideMenu] = useVisibleV2(false);
  const user = useCurrentUser();

  const handleClearHistoryConfirm = () => {
    hideConfirm();
    clear();
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        anchor={<IconButton icon={"dots-vertical"} onPress={showMenu} />}
        onDismiss={hideMenu}
        anchorPosition="bottom"
      >
        <ClearHistoryMenuItem
          onPress={() => {
            hideMenu();
            showConfirm();
          }}
        />
      </Menu>
      <ConfirmDialogV2
        message="Are you sure you want to clear the histrory ?"
        visible={confirmVisible}
        onConfirm={handleClearHistoryConfirm}
        onCancel={hideConfirm}
      />
      <LoadingDialog
        message={t("clearing watch history ...")}
        visible={isPending}
      />
    </>
  );
};

export const EmptyHistory = () => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}
    >
      <ThemedText variant="titleMedium">No history</ThemedText>
    </View>
  );
};

export const ClearHistoryMenuItem = (props: Omit<MenuItemProps, "title">) => {
  return <Menu.Item title="clear history" leadingIcon={"delete"} {...props} />;
};

export default MainHistoryScreen;
