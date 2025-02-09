import { ViewProps } from "react-native";
import { useBookmarkedQuestionsQuery } from "../queries";
import { AppBar } from "@features/navigation/components/AppBar";
import Page from "@components/Page";
import { QueryPage } from "@components/QueryView";

import BookmarkQuestionCard from "../components/BookmarkQuestionCard";
import { BookmarkQuestion } from "../types";
import { ContainerView } from "@components/styled";
import { AnimatedFlashList, FlashListProps } from "@shopify/flash-list";
import { RefreshControl } from "react-native";

type BookmarkedQuestionsScreenProps = {} & ViewProps;

const BookmarkedQuestionsScreen = ({
  ...props
}: BookmarkedQuestionsScreenProps) => {
  const q = useBookmarkedQuestionsQuery();

  /*
   *
   * refreshControl
   * I want the refreshing icon to appear when the user has pulled it down,
   * and to remain until page is fully refetched,
   * to achiev this you must know when the user has pulled the refresh,
   */

  return (
    <Page>
      <AppBar title="Bookamrs" />
      {/* Actual list */}
      <QueryPage query={q}>
        <BookmarkedQuestionsList
          // gap between cards
          data={q.data?.results}
          refreshing={true}
        />
      </QueryPage>
    </Page>
  );
};

function BookmarkedQuestionsList<itemT>({
  ...props
}: Omit<FlashListProps<itemT>, "renderItem">) {
  return (
    <AnimatedFlashList
      showsVerticalScrollIndicator={false}
      estimatedItemSize={120}
      renderItem={({ item }) => (
        <ContainerView style={{ paddingBottom: 8, paddingTop: 8 }}>
          <BookmarkQuestionCard bookmarkQuestion={item as BookmarkQuestion} />
        </ContainerView>
      )}
      {...props}
    />
  );
}

export default BookmarkedQuestionsScreen;

// import Page from "@/components/Page";
// import { ScreenListV2, ScreenListV3 } from "@/components/ScreenFlatList";
// import { useBookmarkedQuestionsQuery, useInfiniteHistory } from "../queries";
// import QuestionHistoryCell from "../components/QuestionHistoryCell";
// import { AppBar } from "@/features/navigation/components/AppBar";
// import { t } from "i18next";
// import FilterOptionsView from "@/components/FilterOptionsView";
// import { Appbar, IconButton, Menu, MenuItemProps } from "react-native-paper";
// import { useTranslation } from "react-i18next";
// import useClearWatchHistoryMutation from "../mutations";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import LoadingDialog from "@/components/LoadingDialog";
// import useFilterOptions from "@/hooks/useFilterOptions";
// import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
// import { useVisibleV2 } from "@/hooks/useVisible";
// import { SnackbarProvider } from "@/contexts/SnackbarContext";
// import {
//   SearchContextProvider,
//   SearchContextbar,
//   useSearchContext,
// } from "@/contexts/SearchContext";
// import { View } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import { useMemo } from "react";
// import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
// import { ServerPage } from "@components/ServerView";
// import CenterPage from "@components/CenterPage";

// const MainHistoryScreen = () => {
//   return (
//     <SearchContextProvider>
//       <SnackbarProvider>
//         <Page>
//           <HistoryAppbar />
//           <WatchHistoryList />
//         </Page>
//       </SnackbarProvider>
//     </SearchContextProvider>
//   );
// };

// export const WatchHistoryList = () => {
//   const { t } = useTranslation();
//   const { options, currentFilter, onFilterChange } = useFilterOptions([
//     { label: t("Newest"), value: "-watched_at" },
//     { label: t("Oldest"), value: "watched_at" },
//   ]);

//   const { searchValue } = useSearchContext();

//   const renderHeader = () => {
//     return (
//       <FilterOptionsView
//         currentFilter={currentFilter}
//         filterOptions={options}
//         onFilterChange={onFilterChange}
//       />
//     );
//   };

//   const q = useInfiniteHistory({
//     ordering: currentFilter,
//     search: searchValue,
//   });

//   // FIXME: duplicate in FollowingRequestsToMe
//   const data = useMemo(() => {
//     if (!q.data) return [];

//     return q.data.pages.map((page) => page.results).flat();
//   }, [q.data]);

//   const renderFooter = () => {
//     if (q.isFetchingNextPage) return <ListFooterActivityIndicator />;
//   };

//   return (
//     <ScreenListV2
//       renderItem={({ item, index }) => {
//         return <QuestionHistoryCell history={item} key={index} />;
//       }}
//       isPending={q.isPending}
//       ListHeaderComponent={renderHeader}
//       ListFooterComponent={renderFooter}
//       ListEmptyComponent={EmptyHistory}
//       onEndReachedThreshold={1}
//       onEndReached={q.fetchNextPage}
//       estimatedItemSize={200}
//       isError={q.isError}
//       refreshing={q.isRefetching}
//       onRefresh={q.refetch}
//       onRetry={q.refetch}
//       overScrollMode="always"
//       data={data}
//     />
//   );
// };

// const HistoryAppbar = () => {
//   const { isSearch } = useSearchContext();
//   return isSearch ? <SearchContextbar /> : <OptionsAppbar />;
// };

// export const OptionsAppbar = () => {
//   const { setIsSearch } = useSearchContext();
//   return (
//     <AppBar title={t("Watch_history")}>
//       <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
//       <HistoryAppbarOptions />
//     </AppBar>
//   );
// };

// export const HistoryAppbarOptions = () => {
//   const {
//     mutate: clear,
//     isPending,
//     isSuccess,
//   } = useClearWatchHistoryMutation();
//   const [confirmVisible, showConfirm, hideConfirm] = useVisibleV2(false);
//   const [menuVisible, showMenu, hideMenu] = useVisibleV2(false);
//   const user = useCurrentUser();

//   const handleClearHistoryConfirm = () => {
//     hideConfirm();
//     clear();
//   };

//   return (
//     <>
//       <Menu
//         visible={menuVisible}
//         anchor={<IconButton icon={"dots-vertical"} onPress={showMenu} />}
//         onDismiss={hideMenu}
//         anchorPosition="bottom"
//       >
//         <ClearHistoryMenuItem
//           onPress={() => {
//             hideMenu();
//             showConfirm();
//           }}
//         />
//       </Menu>
//       <ConfirmDialogV2
//         message="Are you sure you want to clear the histrory ?"
//         visible={confirmVisible}
//         onConfirm={handleClearHistoryConfirm}
//         onCancel={hideConfirm}
//       />
//       <LoadingDialog
//         message={t("clearing watch history ...")}
//         visible={isPending}
//       />
//     </>
//   );
// };

// export const EmptyHistory = () => {
//   return (
//     <View
//       style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}
//     >
//       <ThemedText variant="titleMedium">No history</ThemedText>
//     </View>
//   );
// };

// export const ClearHistoryMenuItem = (props: Omit<MenuItemProps, "title">) => {
//   return <Menu.Item title="clear history" leadingIcon={"delete"} {...props} />;
// };

// export default MainHistoryScreen;
