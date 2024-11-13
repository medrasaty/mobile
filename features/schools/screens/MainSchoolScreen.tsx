import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "@/components/styled";
import { SearchContextProvider } from "@/contexts/SearchContext";
import { useSchools } from "../queries";
import { ScreenListV2, ScreenListV3 } from "@/components/ScreenFlatList";
import SchoolCell from "../components/SchoolCell";
import { School } from "../types";
import { Searchbar } from "react-native-paper";
import { containerMargins } from "@/constants/styels";

type MainSchoolScreenProps = {};

const MainSchoolScreen = ({}: MainSchoolScreenProps) => {
  /**
   * Features of main school screen:
   * - list schools , newest first
   * - allow search and filtering
   */

  const q = useSchools();

  const renderItem = ({ item }: { item: School }) => {
    return <SchoolCell school={item} />;
  };

  return (
    <SearchContextProvider>
      <SafeAreaView>
        <Searchbar
          value="solo"
          style={[containerMargins, { marginBottom: 8 }]}
        />
        <Page>
          <ScreenListV3 estimatedItemSize={100} renderItem={renderItem} q={q} />
        </Page>
      </SafeAreaView>
    </SearchContextProvider>
  );
};

export default MainSchoolScreen;
