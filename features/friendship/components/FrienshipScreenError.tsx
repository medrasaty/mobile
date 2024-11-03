import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";
type FrienshipScreenErrorProps = {
  message: string;
};

const FrienshipScreenError = ({ message }: FrienshipScreenErrorProps) => {
  return (
    <Page style={styles.container}>
      <ThemedText variant="bodyLarge">{message}</ThemedText>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FrienshipScreenError;
