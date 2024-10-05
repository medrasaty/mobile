import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "@/components/styled";
import { StyleSheet } from "react-native";

type UserProfileScreenErrorProps = {};

const UserProfileScreenError = ({}: UserProfileScreenErrorProps) => {
  return (
    <SafeAreaView>
      <Page style={styles.container}>
        <ThemedText>Error</ThemedText>
      </Page>
    </SafeAreaView>
  );
};

export default UserProfileScreenError;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
