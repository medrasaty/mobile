import Page from "@components/Page";
import { View, ViewProps } from "react-native";
import { useSearchStore } from "../store";
import useSearch from "../queries";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import { ThemedText } from "@/components/ThemedText";
import { t } from "i18next";
import { School } from "@/types/school.types";

type SearchResultSchoolsScreenProps = {} & ViewProps;

const SearchResultSchoolsScreen = ({
  ...props
}: SearchResultSchoolsScreenProps) => {
  const query = useSearchStore((state) => state.query);

  const q = useSearch<School>({ query, type: "schools" });

  const renderItem = ({ item, index }: { item: School; index: number }) => {
    return <ThemedText style={{ margin: 20 }}>{item.name}</ThemedText>;
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <ThemedText bold variant="titleMedium">
          {t("no_schools_maches_your_query")}
        </ThemedText>
      </View>
    );
  };

  return (
    <Page>
      <ScreenListV2
        ListEmptyComponent={renderEmptyList}
        renderItem={renderItem}
        data={q.data}
        estimatedItemSize={200}
        onRetry={q.refetch}
        isPending={q.isFetching}
        isError={q.isError}
      />
    </Page>
  );
};

export default SearchResultSchoolsScreen;
