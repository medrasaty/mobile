import { Container, SafeAreaView } from "@/components/styled";
import { useSession } from "@/hooks/useSession";
import { Button, Text } from "react-native-paper";

export default function HomePage() {
  const { signOut } = useSession();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text variant="displaySmall">
          {JSON.stringify(process.env.NODE_ENV)}
        </Text>
        <Button mode="contained-tonal" onPress={() => signOut()}>
          logout
        </Button>
      </Container>
    </SafeAreaView>
  );
}
