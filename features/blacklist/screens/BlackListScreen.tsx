import Page from "@/components/Page";
import { useInfiniteBlackListUsers } from "../queries";
import ScreenList from "@/components/ScreenFlatList";
import BlackListUserCell from "../components/BlackListUserCell";
import { useEffect, useMemo } from "react";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { AppBar } from "@/features/navigation/components/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SearchContextProvider,
  useSearchContext,
} from "../contexts/SearchContexts";
import { ThemedView } from "@/components/ThemedView";
import { t } from "i18next";
import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import { BackHandler, useWindowDimensions } from "react-native";
import { MotiView } from "moti";

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
  return isSearch ? <SearchAppbar /> : <OptionAppbar />;
};

export const OptionAppbar = () => {
  const { setIsSearch } = useSearchContext();
  return (
    <ThemedView style={{ marginTop: 8 }}>
      <AppBar title={t("blacklist")}>
        <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
        <Appbar.Action
          icon={"dots-vertical"}
          onPress={() => alert("options")}
        />
      </AppBar>
    </ThemedView>
  );
};

export const SearchAppbar = () => {
  const { searchValue, setSearchValue, isSearch, setIsSearch } =
    useSearchContext();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIsSearch(false);
    });
  }, []);

  const handleClose = () => {
    setSearchValue("");
    setIsSearch(false);
  };

  return (
    <MotiView
      animate={{ width: isSearch ? width : 0 }}
      style={{ backgroundColor: "red", marginTop: insets.top }}
    >
      <Searchbar
        onChangeText={(text) => setSearchValue(text)}
        style={{ width, backgroundColor: theme.colors.surface }}
        icon={"arrow-right"}
        onIconPress={handleClose}
        // showDivider={false}
        autoFocus
        mode="view"
        value={searchValue}
      />
    </MotiView>
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
    <ScreenList
      renderItem={({ item, index }) => {
        return <BlackListUserCell key={index} user={item} />;
      }}
      data={data}
      estimatedItemSize={100}
      onEndReached={q.fetchNextPage}
      ListFooterComponent={
        <ListFooterActivityIndicator loading={q.isFetchingNextPage} />
      }
      keyExtractor={(item) => item.username}
      isPending={q.isPending}
      isError={q.isError}
      onRetry={q.refetch}
      refreshing={q.isRefetching}
      onRefresh={q.refetch}
    />
  );
};

export default BlackListScreen;
