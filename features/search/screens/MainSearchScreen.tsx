import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "@/components/styled";
import { Searchbar } from "react-native-paper";

const MainSearchScreen = () => {
  return (
    <SafeAreaView>
      <Page container>
        <Searchbar value="search" placeholder="Search" />
      </Page>
    </SafeAreaView>
  );
};

export default MainSearchScreen;
