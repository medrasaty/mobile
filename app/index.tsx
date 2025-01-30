import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/routes";
import SmallButton from "@components/SmallButton";
import { ThemedText } from "@components/ThemedText";
import { useSettingStore } from "@features/settings/store";
import { router } from "expo-router";
import { Button } from "react-native-paper";

function IndexPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 9,
          }}
        >
          <Button mode="contained" onPress={() => router.replace(LOGIN_PAGE)}>
            go to login
          </Button>
          <Button mode="elevated" onPress={() => router.replace(HOME_PAGE)}>
            go to home
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
}
