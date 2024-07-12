import Text from "@/components/styled/Text";
import View, { Container } from "@/components/styled/View";
import { router } from "expo-router";
import { Button } from "react-native-paper";

export default function Index() {
  return (
    <View>
      <Container style={{ flex: 1, justifyContent: "space-between" }}>

      <View style={{alignItems: 'center'}}>
        <Text style={{ textAlign: "center"}}>solo</Text>
      </View>
      <Button
        style={{ marginBottom: 8 }}
        mode="contained"
        onPress={() => router.push("/login")}
      >
       سجل الدخول 
      </Button>
      </Container>
    </View>
  );
}
