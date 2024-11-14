import React, { useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
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
import { StatusBar } from "expo-status-bar";
import { Appbar, useTheme } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppBar } from "@/features/navigation/components/AppBar";
import { ThemedText } from "@/components/ThemedText";

interface UserProfileScreenProps {
  username: BaseUser["username"] | undefined;
}

const UserProfileScreen = ({ username }: UserProfileScreenProps) => {
  // REFACTORME
  const theme = useTheme();

  if (!username) return <UserProfileScreenError />;

  const q = useProfile(username);

  if (q.isPending) return <UserProfileScreenLoading />;
  if (q.isError) return <UserProfileScreenError />;

  if (q.data) {
    return (
      <ProfileScreenProvider value={{ profile: q.data }}>
        <BottomSheetModalProvider>
          <ProfileListProvider>
            <AppBar title={q.data.username + "@"} />
            <UserProfileScreenContent onRefresh={q.refetch} />
          </ProfileListProvider>
          <StatusBar backgroundColor={theme.colors.surface} />
        </BottomSheetModalProvider>
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

export const UserProfileScreenContent = ({
  onRefresh,
}: UserProfileScreenContentProps) => {
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
    onRefresh();
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
  const { height: windowHeight } = useWindowDimensions();

  const listHeader = ProfileHeader;

  const listFooter = () => {
    return (
      <ThemedView
        style={[styles.footerContainer, { height: windowHeight / 1.5 }]}
      >
        {questionQuery.isFetching ||
          (answersQuery.isFetching && <LoadingIndicator />)}
      </ThemedView>
    );
  };

  return (
    <Page>
      <FlashList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        {...props}
      />
    </Page>
  );
};

export default UserProfileScreen;
