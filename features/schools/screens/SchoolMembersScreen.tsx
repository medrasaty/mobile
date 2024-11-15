import CenterPage from "@/components/CenterPage";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import { ViewProps, useWindowDimensions } from "react-native";
import useSchoolIdParam from "../hooks";
import { useSchoolMembers } from "../queries";
import { ScreenError } from "@/components/Screen";
import { router } from "expo-router";
import { ScreenFlatListV3 } from "@/components/ScreenFlatList";
import { BaseUser } from "@/types/user.types";
import SchoolMemberCell, {
  MEMBER_CELL_WIDTH,
} from "../components/SchoolMemberCell";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";
import { Appbar } from "react-native-paper";

type SchoolMembersScreenProps = {} & ViewProps;

const NUM_COLUMNS = 3;
const DEFAULT_GAP = 16;

const SchoolMembersScreen = ({ ...props }: SchoolMembersScreenProps) => {
  const schoolId = useSchoolIdParam();

  if (!schoolId)
    return <ScreenError message="invalid school" onRetry={router.back} />;

  return (
    <SearchContextProvider>
      <Page>
        <HeaderBar />
        <MembersList />
      </Page>
    </SearchContextProvider>
  );
};

const HeaderBar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <OptionsAppbar />;
};

export const OptionsAppbar = () => {
  const { setIsSearch } = useSearchContext();
  return (
    <AppBar title={t("Members")}>
      <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
    </AppBar>
  );
};

export const MembersList = () => {
  const schoolId = useSchoolIdParam();
  const { width } = useWindowDimensions();

  if (!schoolId)
    return <ScreenError message="invalid school" onRetry={router.back} />;

  const { searchValue } = useSearchContext();
  const q = useSchoolMembers({ school: schoolId, search: searchValue });

  const renderItem = ({ item }: { item: BaseUser }) => {
    return <SchoolMemberCell member={item} />;
  };

  return (
    <>
      {/* Return different List based on screen size */}
      {width >= MEMBER_CELL_WIDTH + NUM_COLUMNS * DEFAULT_GAP ? (
        <ScreenFlatListV3
          columnWrapperStyle={{ gap: DEFAULT_GAP }}
          contentContainerStyle={{ alignItems: "center", gap: DEFAULT_GAP }}
          numColumns={NUM_COLUMNS}
          renderItem={renderItem}
          q={q}
        />
      ) : (
        <ScreenFlatListV3
          columnWrapperStyle={{ gap: DEFAULT_GAP - 5 }}
          contentContainerStyle={{
            alignItems: "center",
            gap: DEFAULT_GAP - 5,
          }}
          numColumns={NUM_COLUMNS - 1}
          renderItem={renderItem}
          q={q}
        />
      )}
    </>
  );
};
export default SchoolMembersScreen;
