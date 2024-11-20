import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { router, useRouter } from "expo-router";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import useSearchQuery from "../hooks";
import CenterPage from "@components/CenterPage";
import { ThemedText } from "@components/ThemedText";
import { useTranslation } from "react-i18next";

const MainSearchScreen = () => {
  const searchQuery = useSearchQuery();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(searchQuery);

  const hanldeSearchIconPress = () => {
    if (searchValue.trim() !== "")
      router.push({
        pathname: "/search_result",
        params: {
          q: searchValue.trim(), // clean query
        },
      });
  };

  return (
    <SafeAreaView>
      <Page container>
        <Searchbar
          value={searchValue}
          onIconPress={hanldeSearchIconPress}
          onChangeText={(text) => setSearchValue(text)}
          placeholder={t("Search")}
          blurOnSubmit
          onKeyPress={(e) => console.log(e.nativeEvent.key)}
        />
        <CenterPage>
          <ThemedText>{t("nested.greeting", { name: "ahmed" })}</ThemedText>
        </CenterPage>
      </Page>
    </SafeAreaView>
  );
};

export default MainSearchScreen;
