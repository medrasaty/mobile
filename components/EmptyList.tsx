import { View, ViewProps } from "react-native";

type EmptyViewProps = {
  /**
   * The message to display when the list is empty.
   */
  message?: string;

  /**
   * The icon to display when the list is empty.
   */
  icon?: IconButtonProps["icon"];
} & ViewProps;

const EmptyView = ({
  message = "No data available",
  icon,
  style,
  ...props
}: EmptyViewProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {icon && (
        <IconButton
          onPress={() => alert("answer")}
          mode="contained-tonal"
          style={styles.icon}
          icon={icon}
          size={22}
        />
      )}
      <ThemedText variant="bodyLarge">{message.toUpperCase()}</ThemedText>
      <View></View>
    </View>
  );
};

import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { IconButton, IconButtonProps } from "react-native-paper";
import { debugStyle } from "@/constants/styels";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 0,
  },
});

export default EmptyView;
