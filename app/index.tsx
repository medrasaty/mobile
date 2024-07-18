import { Container } from "@/components/styled";
import View, { SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE, LOGIN_PAGE } from "@/constants/routes";
import { router } from "expo-router";
import { Button, useTheme } from "react-native-paper";

export default function IndexPage() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button mode="contained" onPress={() => router.push(LOGIN_PAGE)}>
            go to login
          </Button>
          <Button mode="elevated" onPress={() => router.push(HOME_PAGE)}>
            go to home
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
}
