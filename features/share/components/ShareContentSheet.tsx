import LoadingDialog from "@/components/LoadingDialog";
import ServerView from "@/components/ServerView";
import { Container } from "@/components/styled";
import { containerPaddings } from "@/constants/styels";
import { SearchContextProvider } from "@/contexts/SearchContext";
import { FriendUser } from "@/features/friendship/types";
import useDismisBottomSheetModal from "@/hooks/useDismisBottomSheetModal";
import {
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { t } from "i18next";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, TextInput, useWindowDimensions, ViewProps, Text, TextProps } from "react-native";
import { useTheme } from "react-native-paper";
import { ShareContentContextProvider } from "../contexts/ShareContentSheetContext";
import useShareQuestionMutation from "../mutations";
import useShareUsers from "../queries";
import { useShareStore } from "../store";
import Footer from "./SheetFooter";
import UserShareCell from "./UserShareCell";
import { Sheet, useSheetRef } from "@/components/Sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ShareContentSheetProps = {
  questionId: string | number;
  onClose?: () => void;
};

const ShareContentSheet = forwardRef<ReturnType<typeof useSheetRef>["current"], ShareContentSheetProps>(
  ({ questionId, onClose }, ref) => {
    // height of the current screen
    const { height: windowHeight } = useWindowDimensions();
    const [halfScreenHeight, fullScreenHeight] = useMemo(
      () => [windowHeight / 2, windowHeight],
      [windowHeight]
    );
    const snapPoints = useMemo(() => [halfScreenHeight, fullScreenHeight], [halfScreenHeight, fullScreenHeight]);

    const selectedUsers = useShareStore((state) => state.selectedUsers);
    const clear = useShareStore((state) => state.clear);
    const {
      mutate: share,
      status,
      isPending,
      isSuccess,
    } = useShareQuestionMutation();

    useDismisBottomSheetModal(isSuccess);

    const handleSubmit = useCallback((comment: string) => {
      share({
        question: questionId,
        comment: comment,
        shared_with: selectedUsers.map((user) => user.id),
      });
    }, [questionId, selectedUsers, share]);

    const handleClose = useCallback(() => {
      clear(); // clear everything
      onClose?.();
    }, [clear, onClose]);

    const renderFooter = useCallback((props: BottomSheetFooterProps) => {
      return <Footer onSubmit={handleSubmit} {...props} />;
    }, [handleSubmit]);

    return (
      <>
        <Sheet
          ref={ref}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdrop
          contentContainerStyle={styles.sheetContent}
          footerComponent={renderFooter}
          onClose={handleClose}
        >
          <SearchContextProvider>
            <ShareContentContextProvider>
              <Container style={styles.container}>
                <SearchTextInput />
                <FollowingList />
              </Container>
            </ShareContentContextProvider>
          </SearchContextProvider>
        </Sheet>
        <LoadingDialog visible={isPending} message={t("sharing") + "..."} />
      </>
    );
  }
);

const SearchTextInput = () => {
  const searchValue = useShareStore((state) => state.searchValue);
  const updateSearchValue = useShareStore((state) => state.updateSearchValue);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <TextInput
      value={searchValue}
      style={[
        styles.searchInputStyle,
        {
          backgroundColor: theme.colors.surfaceVariant,
          color: theme.colors.onSurface,
          borderColor: theme.colors.outline,
          borderWidth: 1,
          paddingTop: insets.top > 0 ? 8 : 4,
        },
      ]}
      placeholderTextColor={theme.colors.onSurfaceDisabled}
      placeholder={t("search")}
      onChangeText={updateSearchValue}
      numberOfLines={1}
      multiline={false}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  );
};

const FollowingList = (props: ViewProps) => {
  const searchValue = useShareStore((state) => state.searchValue);
  const q = useShareUsers({ search: searchValue });
  const selectedUsers = useShareStore((state) => state.selectedUsers);

  const renderItem = useCallback(({ item }: { item: FriendUser }) => {
    return (
      <UserShareCell style={{ alignItems: "center", flex: 1 }} user={item} />
    );
  }, []);

  const emptyComponent = useCallback(() => {
    if (q.isLoading) return null;

    return (
      <Container style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>
          {searchValue.trim() !== ""
            ? t("no_search_results")
            : t("no_friends_to_share_with")}
        </ThemedText>
      </Container>
    );
  }, [q.isLoading, searchValue]);

  const data = useMemo(() => {
    return searchValue.trim() === ""
      ? [...selectedUsers, ...q.unSelectedUsers]
      : q.data;
  }, [searchValue, selectedUsers, q.unSelectedUsers, q.data]);

  return (
    <ServerView
      onRetry={q.refetch}
      style={{ flex: 1, marginTop: 20 }}
      status={q.status}
    >
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.pk)}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={3}
        renderItem={renderItem}
        data={data}
        ListEmptyComponent={emptyComponent}
        initialNumToRender={12}
        maxToRenderPerBatch={9}
        windowSize={5}
      />
    </ServerView>
  );
};

interface ThemedTextProps extends TextProps {
  style?: any;
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return <Text style={[{ color: theme.colors.onSurface }, style]} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    flex: 1,
  },
  searchInputStyle: {
    padding: 10,
    ...containerPaddings,
    borderRadius: 8,
    fontSize: 16,
  },
  flatListContent: {
    gap: 20,
    paddingBottom: 100, // Extra space for footer
  },
  columnWrapper: {
    gap: 20,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  }
});

export default ShareContentSheet;
