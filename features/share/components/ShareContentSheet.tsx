import ServerView from "@/components/ServerView";
import SheetView from "@/components/SheetView";
import { Container } from "@/components/styled";
import { containerPaddings, debugStyle } from "@/constants/styels";
import {
  SearchContextProvider,
  useSearchContext,
} from "@/contexts/SearchContext";
import { useFollowingQuery } from "@/features/friendship/hooks/useFriendsQuery";
import { FriendUser } from "@/features/friendship/types";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { t } from "i18next";
import { forwardRef, useMemo } from "react";
import { ViewProps, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import UserShareCell from "./UserShareCell";
import {
  ShareContentContextProvider,
  useShareContext,
} from "../contexts/ShareContentSheetContext";

type ShareContentSheetProps = {
  solo: string;
};

const ShareContentSheet = forwardRef<BottomSheetModal, ShareContentSheetProps>(
  ({ solo }, ref) => {
    const snapPoints = useMemo(() => ["50%", "98%"], []);
    return (
      <SheetView ref={ref} snapPoints={snapPoints}>
        <SearchContextProvider>
          <ShareContentContextProvider>
            <Container>
              <SearchTextInput />
              <FollowingList />
            </Container>
          </ShareContentContextProvider>
        </SearchContextProvider>
      </SheetView>
    );
  }
);

const SearchTextInput = () => {
  const { searchValue, setSearchValue } = useSearchContext();
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
      onChangeText={(text) => setSearchValue(text)}
      numberOfLines={1}
      multiline={false}
    />
  );
};

const FollowingList = (props: ViewProps) => {
  const q = useFollowingQuery();
  const { sharedWith } = useShareContext();
  const renderItem = ({ item }: { item: FriendUser }) => {
    return (
      <UserShareCell style={{ alignItems: "center", flex: 1 }} user={item} />
    );
  };
  console.log(sharedWith);

  return (
    <ServerView style={{ flex: 1, marginTop: 30 }} status={q.status}>
      <BottomSheetFlatList
        keyExtractor={(i) => i.username}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        numColumns={3}
        renderItem={renderItem}
        data={q.data}
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
