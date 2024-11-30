import { router } from "expo-router";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { path } from "@/lib/routing";

export function NewQuestionFAB() {
  function handlePress() {
    router.push(path.questions.new);
  }

  return (
    <FAB
      icon={"message"}
      variant="surface"
      onPress={handlePress}
      style={[styles.FABStyles]}
    />
  );
}

const styles = StyleSheet.create({
  FABStyles: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
