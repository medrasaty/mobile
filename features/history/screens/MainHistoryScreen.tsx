import Page from "@/components/Page";
import ScreenList from "@/components/ScreenFlatList";
import useHistory from "../queries";
import QuestionHistoryCell from "../components/QuestionHistoryCell";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import FilterOptionsView, {
  FilterOption,
} from "@/components/FilterOptionsView";
import { useMemo, useState } from "react";
import { Appbar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import OptionsMenu, { OptionType } from "@/components/OptionsMenu";

const MainHistoryScreen = () => {
  const { t } = useTranslation();

  const filterOptions = useMemo(() => {
    return [
      { label: t("Newest"), value: "-watched_at" },
      { label: t("Oldest"), value: "watched_at" },
    ] as FilterOption[];
  }, []);

  const [filter, setFilter] = useState<FilterOption["value"]>(
    filterOptions[0]["value"]
  );

  const q = useHistory({ ordering: filter });

  const renderHeader = () => {
    return (
      <FilterOptionsView
        currentFilter={filter}
        filterOptions={filterOptions}
        onFilterChange={(value) => setFilter(value)}
      />
    );
  };

  return (
    <Page>
      <HistoryAppbar />
      <ScreenList
        renderItem={({ item, index }) => {
          return <QuestionHistoryCell history={item} key={index} />;
        }}
        isPending={q.isPending}
        // ItemSeparatorComponent={Divider}
        ListHeaderComponent={renderHeader}
        estimatedItemSize={200}
        isError={q.isError}
        refreshing={q.isRefetching}
        onRefresh={q.refetch}
        onRetry={q.refetch}
        data={q.data}
      />
    </Page>
  );
};

const HistoryAppbar = () => {
  const options = [
    { id: 1, title: "clear watch history", icon: "delete" },
  ] as OptionType[];
  return (
    <AppBar title={t("Watch_history")}>
      <Appbar.Action icon="magnify" onPress={() => alert("search")} />
      <OptionsMenu
        onOptionPressed={(optoin) => alert(optoin.title)}
        options={options}
        anchorPosition="bottom"
      />
    </AppBar>
  );
};

export default MainHistoryScreen;
