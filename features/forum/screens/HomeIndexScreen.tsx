import { AddQuestionAnimatedFAB } from "@/components/FAB";
import FilteringOptions from "@/components/FilteringOptions";
import Text from "@/components/styled/Text";
import View, { SafeAreaView } from "@/components/styled/View";
import { useAnimatedAppBar } from "@/contexts";
import useQuestions from "@/features/forum/hooks/useQuestions";
import { filterOptionType } from "@/types";
import { Question } from "@/types/forum.types";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl, ViewProps } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { modeAppbarHeight } from "react-native-paper/src/components/Appbar/utils";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import PlaceholderPage from "@components/PlaceholderPage";
import { useForumQuestions } from "@forum/queries";
import Page from "@components/Page";
import { ScreenListV2, ScreenListV3 } from "@components/ScreenFlatList";
import { AppBar, HomeAppBar } from "@features/navigation/components/AppBar";
import FilterOptionsView from "@components/FilterOptionsView";
import useFilterOptions from "@/hooks/useFilterOptions";
import { t } from "i18next";

export default function HomeScreen() {
  const q = useForumQuestions();
  const { options, onFilterChange, currentFilter } = useFilterOptions([
    // TODO: impolement this filtering
    { label: "for you", value: "foryou" },
    { label: "following", value: "followings" },
  ]);

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    return <ForumQuestionCard question={item} />;
  };

  const renderHeader = () => {
    return (
      <FilterOptionsView
        filterOptions={options}
        onFilterChange={onFilterChange}
        currentFilter={currentFilter}
      />
    );
  };

  return (
    <Page>
      <HomeAppBar />
      <ScreenListV2
        ListHeaderComponent={renderHeader}
        estimatedItemSize={FORUM_QUESTION_CARD_HEIGHT}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        data={q.data}
        isPending={q.isPending}
        isError={q.isError}
        onRetry={q.refetch}
        errorMessage="error"
      />
    </Page>
  );
}

export function HomeIndexScreen() {
  return (
    <BottomSheetModalProvider>
      <SafeAreaView>
        <QuestionsPage />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const QuestionsPage = () => {
  return <QuestionsList />;
};

const sortingOptions: filterOptionType[] = [
  {
    id: 1,
    label: "الكل",
    selected: true,
    filter: (questions) => questions,
  },
  {
    id: 2,
    label: "الاكثر تفاعلاً",
    filter: (questions: Question[]) => {
      return questions.sort((a, b) => b.answers_count - a.answers_count);
    },
  },
  {
    id: 3,
    label: "الاكثر مشاهدة",
    filter: (questions: Question[]) =>
      questions.sort((a, b) => b.views - a.views),
  },
  {
    id: 9,
    label: "الاكثر مشاهدة",
    filter: (questions: Question[]) =>
      questions.sort((a, b) => b.views - a.views),
  },

  {
    id: 4,
    label: "الاعلى تقييماً",
    filter: (questions: Question[]) => {
      return questions.sort((a, b) => b.ratings_value - a.ratings_value);
    },
  },
];

const QuestionsList = () => {
  const [orderingOptions, setOrderingOptions] =
    useState<filterOptionType[]>(sortingOptions);
  const [isFABExtended, setIsFABExtended] = useState(true);
  const { show, hide } = useAnimatedAppBar();

  const selectedOrdering = orderingOptions.filter(
    (option) => option.selected
  )[0];

  const q = useQuestions({ selectedOrdering });

  useFocusEffect(
    React.useCallback(() => {
      q.refetch();
    }, [])
  );

  const renderFooter = () => {
    if (q.isFetching) return <QuestionsListFooter />;
    return null;
  };

  const renderEmptyComponent = () => {
    if (!q.filteredData) return <QuestionsListEmpty />;
    return null;
  };

  const handleScroll = useCallback(
    ({ nativeEvent }: { nativeEvent: any }) => {
      const currentScrollPosition =
        Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
      const velocity = nativeEvent.velocity.y;

      const MIN_VELOCITY = 2;

      if (velocity > MIN_VELOCITY && currentScrollPosition > 0) {
        hide();
        setIsFABExtended(false);
      } else if (velocity < 0 || currentScrollPosition <= 0) {
        show();
        setIsFABExtended(true);
      }
    },
    [hide, show]
  );

  return (
    <>
      <FlashList
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingTop: modeAppbarHeight["small"] }}
        ItemSeparatorComponent={Divider}
        ListHeaderComponent={
          <QuestionsListHeader
            options={orderingOptions}
            setOptions={setOrderingOptions}
          />
        }
        data={q.filteredData || []}
        refreshControl={
          <RefreshControl refreshing={q.isFetching} onRefresh={q.refetch} />
        }
        renderItem={({ item }) => <ForumQuestionCard question={item} />}
        estimatedItemSize={200}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        overScrollMode="never"
      />
      <AddQuestionAnimatedFAB isExtended={isFABExtended} />
    </>
  );
};

type QuestionsListHeaderProps = {
  options: filterOptionType[];
  setOptions: React.Dispatch<React.SetStateAction<filterOptionType[]>>;
} & ViewProps;

const QuestionsListHeader = ({
  options,
  setOptions,
  ...props
}: QuestionsListHeaderProps) => {
  function handleOptionSelect(id: filterOptionType["id"]) {
    const selectedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, selected: true };
      } else {
        return { ...option, selected: false };
      }
    });
    setOptions(selectedOptions);
  }

  return (
    <View {...props}>
      <FilteringOptions options={options} onSelect={handleOptionSelect} />
    </View>
  );
};

const QuestionsListFooter = () => {
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const QuestionsListEmpty = () => {
  // TODO: add better empty state UI
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>لا توجد بيانات لعرضها.</Text>
    </View>
  );
};
