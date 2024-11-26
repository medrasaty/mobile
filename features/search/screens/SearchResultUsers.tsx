import Page from "@components/Page";
import { View, ViewProps } from "react-native";
import { useSearchStore } from "../store";
import useSearch from "../queries";

import { ScreenListV2 } from "@/components/ScreenFlatList";
import { Question } from "@/types/forum.types";
import { ThemedText } from "@/components/ThemedText";
import { t } from "i18next";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";
import { School } from "@/types/school.types";
import SchoolMemberCell from "@features/schools/components/SchoolMemberCell";
import { BaseUser } from "@/types/user.types";
import BaseUserCell from "@components/UserCell";

type SearchResultUsersScreenProps = {} & ViewProps;

const SearchResultUsersScreen = ({
  ...props
}: SearchResultUsersScreenProps) => {
  const query = useSearchStore((state) => state.query);

  const q = useSearch<BaseUser>({ query, type: "users" });

  const renderItem = ({ item, index }: { item: BaseUser; index: number }) => {
    return <BaseUserCell user={item} />;
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
          {t("no_users_maches_your_query")}
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

export default SearchResultUsersScreen;
