import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { router } from "expo-router";
import { Text, View } from "react-native";

const Expoer = () => {
  return (
    <Page>
      <CenterPage>
        <View>
          <Text
            onPress={() => {
              router.push({
                pathname: `/questions/details`,
                params: { questionId: "498fdbb1-7e69-4a3c-8e45-82b8e91fc311" },
              });
            }}
          >
            Expoer
          </Text>
        </View>
      </CenterPage>
    </Page>
  );
};
