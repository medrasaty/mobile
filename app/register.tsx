import { Container } from "@/components/styled";
import View from "@/components/styled/View";
import { SafeAreaView } from "@/components/styled/View";
import { Text, useTheme } from "react-native-paper";

export default function RegisterPage() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.primary }}>solo is register</Text>
        </View>
      </Container>
    </SafeAreaView>
  );
}
