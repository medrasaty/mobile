import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/routes";
import { ThemedText } from "@components/ThemedText";
import { useSettingStore } from "@features/settings/store";
import { router } from "expo-router";
import { Button } from "react-native-paper";

export default function IndexPage() {
  const setTheme = useSettingStore((state) => state.setTheme);
  const theme = useSettingStore((state) => state.theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 9,
          }}
        >
          <View>
            <ThemedText bold variant="titleMedium">
              store
            </ThemedText>
            <ThemedText>{theme}</ThemedText>
          </View>
          <View>
            <ThemedText bold variant="titleMedium">
              local
            </ThemedText>
          </View>
          <View style={{ gap: 10 }}>
            <Button onPress={() => setTheme("dark")} mode="outlined">
              dark
            </Button>
            <Button onPress={() => setTheme("light")} mode="outlined">
              light
            </Button>
            <Button onPress={() => setTheme("system")} mode="outlined">
              system
            </Button>
          </View>
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
