import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, ViewProps } from "react-native";

type CenterPageProps = ViewProps;

const CenterPage = ({ children, style, ...props }: CenterPageProps) => {
  return (
    <View style={[style, styles.container]} {...props}>
      {children}
    </View>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CenterPage;
