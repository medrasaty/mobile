import { Container } from "@/components/styled";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text variant="displaySmall">لوحة السمعة</Text>
      </Container>
    </SafeAreaView>
  );
}
