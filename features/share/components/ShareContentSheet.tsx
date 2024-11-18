import ServerView from "@/components/ServerView";
import SheetView from "@/components/SheetView";
import { Container } from "@/components/styled";
import { containerPaddings } from "@/constants/styels";
import { SearchContextProvider } from "@/contexts/SearchContext";
import { FriendUser } from "@/features/friendship/types";
import {
  BottomSheetFlatList,
  BottomSheetFooterProps,
  BottomSheetModal,
  useBottomSheetModal,
  useBottomSheetModalInternal,
} from "@gorhom/bottom-sheet";
import { t } from "i18next";
import { forwardRef, useEffect, useMemo } from "react";
import { ViewProps, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import UserShareCell from "./UserShareCell";
import { ShareContentContextProvider } from "../contexts/ShareContentSheetContext";
import useShareUsers from "../queries";
import { useShareStore } from "../store";
import Footer from "./SheetFooter";
import useShareQuestionMutation from "../mutations";
import LoadingDialog from "@/components/LoadingDialog";
import AlertDialog from "@/components/AlertDialog";
import useDismisBottomSheetModal from "@/hooks/useDismisBottomSheetModal";

type ShareContentSheetProps = {
  questionId: string | number;
};

const ShareContentSheet = forwardRef<BottomSheetModal, ShareContentSheetProps>(
  ({ questionId }, ref) => {
    const snapPoints = useMemo(() => ["50%", "98%"], []);
    const selectedUsers = useShareStore((state) => state.selectedUsers);
    const clear = useShareStore((state) => state.clear);
    const {
      mutate: share,
      status,
      isPending,
      isSuccess,
    } = useShareQuestionMutation();

    useDismisBottomSheetModal(isSuccess);

    const handleSubmit = (comment: string) => {
      share({
        question: questionId,
        comment: comment,
        shared_with: selectedUsers.map((user) => user.id), // list of users ids [1, 2, 3]
      });
    };

    const renderFooter = (props: BottomSheetFooterProps) => {
      return <Footer onSubmit={handleSubmit} {...props} />;
    };

    return (
      <SheetView
        onDismiss={() => clear()} // clear everything
        footerComponent={renderFooter}
        ref={ref}
        snapPoints={snapPoints}
      >
        <SearchContextProvider>
          <ShareContentContextProvider>
            <Container>
              <SearchTextInput />
              <FollowingList />
            </Container>
          </ShareContentContextProvider>
        </SearchContextProvider>
        <LoadingDialog visible={isPending} message="sharing..." />
      </SheetView>
    );
  }
);

const SearchTextInput = () => {
  const searchValue = useShareStore((state) => state.searchValue);
  const updateSearchValue = useShareStore((state) => state.updateSearchValue);
  const theme = useTheme();

  return (
    <TextInput
      value={searchValue}
      style={[
        styles.searchInputStyle,
        {
          backgroundColor: theme.colors.surfaceDisabled,
          color: theme.colors.onSurface,
        },
      ]}
      placeholderTextColor={theme.colors.onSurfaceDisabled}
      placeholder={t("search")}
      onChangeText={updateSearchValue}
      numberOfLines={1}
      multiline={false}
    />
  );
};

const FollowingList = (props: ViewProps) => {
  const searchValue = useShareStore((state) => state.searchValue);
  const q = useShareUsers({ search: searchValue });
  const selectedUsers = useShareStore((state) => state.selectedUsers);
  const renderItem = ({ item }: { item: FriendUser }) => {
    return (
      <UserShareCell style={{ alignItems: "center", flex: 1 }} user={item} />
    );
  };

  return (
    <ServerView
      onRetry={q.refetch}
      style={{ flex: 1, marginTop: 30 }}
      status={q.status}
    >
      <BottomSheetFlatList
        keyExtractor={(i) => i.username}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        numColumns={3}
        renderItem={renderItem}
        data={
          searchValue.trim() === ""
            ? [...selectedUsers, ...q.unSelectedUsers]
            : q.data
        }
      />
    </ServerView>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchInputStyle: {
    padding: 4,
    ...containerPaddings,
    borderRadius: 8,
  },
});

export default ShareContentSheet;
