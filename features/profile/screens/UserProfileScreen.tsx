import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import useProfile from "../hooks/useProfile";
import { BaseUser } from "@/types/user.types";
import UserProfileScreenLoading from "../components/UserProfileScreenLoading";
import UserProfileScreenError from "../components/UserProfileScreenError";
import {
  ProfileListChoices,
  NavigatorButtonType,
  TypedData,
} from "@/features/profile/types.types";
import Page from "@/components/Page";
import ProfileHeader from "../components/Profile";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { ThemedView } from "@/components/ThemedView";
import LoadingIndicator from "@/components/LoadingIndicator";
import useProfileListData from "../hooks/useProfileListData";
import { ProfileScreenProvider } from "../contexts/ProfileScreenContext";
import {
  ProfileListProvider,
  useProfileListContext,
} from "../contexts/ProfileListContext";
import { ProfileListItem } from "../components/ProfileListItem";
import { transformToTypedData } from "@/features/profile/utils";

interface UserProfileScreenProps {
  username: BaseUser["username"] | undefined;
}

const UserProfileScreen = ({ username }: UserProfileScreenProps) => {
  // REFACTORME
  if (!username) return <UserProfileScreenError />;

  const q = useProfile(username);

  if (q.isPending) return <UserProfileScreenLoading />;
  if (q.isError) return <UserProfileScreenError />;

  if (q.data) {
    return (
      <ProfileScreenProvider value={{ profile: q.data }}>
        <ProfileListProvider>
          <UserProfileScreenContent onRefresh={q.refetch} />
        </ProfileListProvider>
      </ProfileScreenProvider>
    );
  }
};

interface UserProfileScreenContentProps {
  onRefresh: () => void;
}

export const ProfileListNavigatorButtons: NavigatorButtonType[] = [
  { index: 0, label: "Questions", value: ProfileListChoices.QUESTIONS },
  { index: 1, label: "Answers", value: ProfileListChoices.ANSWERS },
];

export const enum ProfileListTypedDataChoices {
  ANSWER = "ANSWER",
  QUESTION = "QUESTION",
  NAVIGATOR = "NAVIGATOR",
  FILTER = "FILTER",
  EMPTY = "EMPTY",
}

export type ProfileListTypedData = TypedData<ProfileListTypedDataChoices>;

export const DEFAULT_EMTY_CELL_HEIGHT = 100;

export const UserProfileScreenContent = ({}: UserProfileScreenContentProps) => {
  const { selectedList } = useProfileListContext();

  const {
    questionQuery,
    answersQuery,
    onRefresh: onRefreshProfileList,
  } = useProfileListData();

  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  useEffect(() => {
    if (!questionQuery.isRefetching || !answersQuery.isRefetching) {
      setIsPullRefreshing(false);
    }
  }, [isPullRefreshing, questionQuery.isRefetching, answersQuery.isRefetching]);

  const handleRefresh = () => {
    setIsPullRefreshing(true);
    onRefreshProfileList();
  };

  const mainData = useMemo(() => {
    return selectedList === ProfileListChoices.QUESTIONS
      ? transformToTypedData(
          questionQuery.data,
          ProfileListTypedDataChoices.QUESTION
        )
      : transformToTypedData(
          answersQuery.data,
          ProfileListTypedDataChoices.ANSWER
        );
  }, [selectedList, answersQuery.data, questionQuery.data]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ProfileListTypedData;
    index: number;
  }) => {
    return (
      <ThemedView key={index}>
        <ProfileListItem item={item} />
      </ThemedView>
    );
  };

  const genEmptyCells = (count: number) => {
    const emptyCells = [];
    for (let i = 0; i < count; i++) {
      emptyCells.push({
        type: ProfileListTypedDataChoices.EMPTY,
        payload: {},
      });
    }
    return emptyCells;
  };

  const emptyCells = genEmptyCells(5);

  const finalData = [
    {
      type: ProfileListTypedDataChoices.NAVIGATOR,
      payload: {},
    },
    {
      type: ProfileListTypedDataChoices.FILTER,
      payload: {},
    },
    ...mainData,
    ...emptyCells,
  ];

  return (
    <ProfileFlashList
      stickyHeaderIndices={[0]}
      data={finalData}
      renderItem={renderItem}
      viewabilityConfig={{
        // TODO: replace hard coded value
        itemVisiblePercentThreshold: 50,
      }}
      estimatedItemSize={150}
      onRefresh={handleRefresh}
      refreshing={isPullRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

type ProfileFlashListProps = {} & FlashListProps<ProfileListTypedData>;

export const ProfileFlashList = ({ ...props }: ProfileFlashListProps) => {
  /**
   * what do you want?
   * I want to:
   * - calculate the height of the current visible items in the list.
   * how :
   * use the onLayout and onvisibleItemsChanged props of the flashlist
   *
   * Based on that information , you should :
   * - set the height of the list footer ( loading indicator )
   * - create empty cells their height all together is equal to the height of the current visible items
   */

  const { questionQuery, answersQuery } = useProfileListData();

  const listHeader = ProfileHeader;

  const listFooter = () => {
    if (questionQuery.isFetching || answersQuery.isFetching) {
      return (
        <ThemedView style={styles.footerContainer}>
          <LoadingIndicator />
        </ThemedView>
      );
    }
    return null;
  };

  return (
    <Page>
      <FlashList
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        {...props}
      />
    </Page>
  );
};

export default UserProfileScreen;
