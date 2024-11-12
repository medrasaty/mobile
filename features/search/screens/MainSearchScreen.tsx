import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { router } from "expo-router";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

const MainSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");

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
          placeholder="Search"
          blurOnSubmit
          onKeyPress={(e) => console.log(e.nativeEvent.key)}
        />
      </Page>
    </SafeAreaView>
  );
};

export default MainSearchScreen;
