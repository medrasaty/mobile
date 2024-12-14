import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/routes";
import { ThemedText } from "@components/ThemedText";
import { useUpdateClientSettings } from "@features/settings/hooks";
import { useLocalSettingsStore } from "@features/settings/store";
import { router } from "expo-router";
import { Button } from "react-native-paper";

export default function IndexPage() {
  const storeSettings = useLocalSettingsStore((state) => state.settings);
  const update = useUpdateClientSettings();

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
            <ThemedText>{storeSettings.theme}</ThemedText>
          </View>
          <View>
            <ThemedText bold variant="titleMedium">
              local
            </ThemedText>
          </View>
          <View style={{ gap: 10 }}>
            <Button
              onPress={() => update({ ...storeSettings, theme: "dark" })}
              mode="outlined"
            >
              dark
            </Button>
            <Button
              onPress={() => update({ ...storeSettings, theme: "light" })}
              mode="outlined"
            >
              light
            </Button>
            <Button
              onPress={() => update({ ...storeSettings, theme: "system" })}
              mode="outlined"
            >
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
