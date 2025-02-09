import { ThemedText } from "@components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

type NavigationButton = {
  /**
   * Path to page,e.g; '/home/solo/settings/'
   */
  path: string;
  /**
   * Icon, e.g 'settings'
   */
  icon: string;

  /**
   * human readable Label, "Settings"
   */
  label: string;
};

function NavigationButton({ path, icon, label }: NavigationButton) {
  const theme = useTheme();
  // roundness factor
  const factor = 2;
  const roundness = useMemo(() => theme.roundness * factor, [theme, factor]);

  const router = useRouter();
  return (
    <View key={path} style={{ borderRadius: roundness, overflow: "hidden" }}>
      <TouchableRipple
        // Navigate to page
        onPress={() => router.push(path)}
        style={[
          styles.container,
          {
            borderColor: theme.colors.secondary,
            borderRadius: roundness,
          },
        ]}
      >
        <View style={styles.itemContent}>
          <Ionicons name={icon} size={20} color={"gray"} />
          <ThemedText>{label}</ThemedText>
        </View>
      </TouchableRipple>
    </View>
  );
}

type Props = {
  items: NavigationButton[];
} & ViewProps;
/**
 *
 * @param items: list of @NavigationButton to display
 * @returns
 */
function NavigationButtonsList({ items, ...props }: Props) {
  const router = useRouter();
  const theme = useTheme();
  // roundness factor
  const factor = 2;
  const roundness = useMemo(() => theme.roundness * factor, [theme, factor]);

  return (
    <View {...props}>
      {items.map((item) => (
        <NavigationButton key={item.label} {...item} />
      ))}
    </View>
  );
}

import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ViewProps } from "react-native";
import { debugStyle } from "@/constants/styels";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    justifyContent: "center",
  },
  itemContent: {
    marginStart: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default NavigationButtonsList;
