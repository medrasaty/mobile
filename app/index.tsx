import Text from "@/components/styled/Text";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { router } from "expo-router";
import { Button } from "react-native-paper";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1, justifyContent: "center" }}>
        <Button mode="contained-tonal" onPress={() => router.push("/login")}>
          go to login
        </Button>
      </Container>
    </SafeAreaView>
  );
}
