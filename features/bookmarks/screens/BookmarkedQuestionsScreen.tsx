import { ViewProps } from "react-native";
import { useBookmarkedQuestionsQuery } from "../queries";
import { AppBar } from "@features/navigation/components/AppBar";
import Page from "@components/Page";
import { QueryPage } from "@components/QueryView";

import BookmarkQuestionCard from "../components/BookmarkQuestionCard";
import { BookmarkQuestion } from "../types";
import { ContainerView } from "@components/styled";
import { AnimatedFlashList, FlashListProps } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <Page>
      <AppBar title={t("Bookmarks")} />
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
