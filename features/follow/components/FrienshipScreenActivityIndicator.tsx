import Page from "@/components/Page";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

const FrienshipScreenActivityIndicator = () => {
  return (
    <Page style={styles.container}>
      <ActivityIndicator size="large" />
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FrienshipScreenActivityIndicator;
