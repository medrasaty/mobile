import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, ViewProps } from "react-native";
import { ActivityIndicatorProps } from "react-native-paper";
import { StyleSheet } from "react-native";

type ListFooterActivityIndicatorProps = {
  indicatorOptions?: ActivityIndicatorProps;
} & ViewProps;

const ListFooterActivityIndicator = ({
  indicatorOptions,
  ...props
}: ListFooterActivityIndicatorProps) => {
  return (
    <ThemedView style={styles.container} {...props}>
      <ActivityIndicator size="small" {...indicatorOptions} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListFooterActivityIndicator;
