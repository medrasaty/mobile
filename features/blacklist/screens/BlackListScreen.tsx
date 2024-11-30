import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import Page from "@/components/Page";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import { useMemo } from "react";
import { Appbar } from "react-native-paper";
import BlackListUserCell from "../components/BlackListUserCell";
import { useInfiniteBlackListUsers } from "../queries";

type BlackListScreenProps = {};

const BlackListScreen = ({}: BlackListScreenProps) => {
  return (
    <SearchContextProvider>
      <Page>
        <BlackListAppbar />
        <BlackListUsersList />
      </Page>
    </SearchContextProvider>
  );
};

export const BlackListAppbar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <OptionAppbar />;
};

export const OptionAppbar = () => {
  const { setIsSearch } = useSearchContext();
  return (
    <AppBar title={t("blacklist")}>
      <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
      <Appbar.Action icon={"dots-vertical"} onPress={() => alert("options")} />
    </AppBar>
  );
};

export const BlackListUsersList = () => {
  const { searchValue } = useSearchContext();
  const q = useInfiniteBlackListUsers({ search: searchValue });

  // FIXME: duplicate in FollowingRequestsToMe
  const data = useMemo(() => {
    if (!q.data) return [];

    return q.data.pages.map((page) => page.results).flat();
  }, [q.data]);

  return (
    <ScreenListV2
      renderItem={({ item, index }) => {
        return <BlackListUserCell key={index} user={item} />;
      }}
      data={data}
      estimatedItemSize={100}
      onEndReached={q.fetchNextPage}
      ListFooterComponent={
        <ListFooterActivityIndicator loading={q.isFetchingNextPage} />
      }
      keyExtractor={(item) => item.pk}
      isPending={q.isPending}
      isError={q.isError}
      onRetry={q.refetch}
      refreshing={q.isRefetching}
      onRefresh={q.refetch}
    />
  );
};

export default BlackListScreen;
