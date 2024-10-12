import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMemo, useState } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from "react-native";
import { useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { NavigatorButtonType } from "@/features/profile/types";
import { useProfileListContext } from "../contexts/ProfileListContext";

type ProfileNavigatorProps = {
  navigatorButtons: NavigatorButtonType[];
} & ViewProps;

const ProfileNavigator = ({
  navigatorButtons,
  style,
  ...props
}: ProfileNavigatorProps) => {
  const { selectedList, setSelectedList } = useProfileListContext();
  const styles = useStyles();
  const handleSelect = (button: NavigatorButtonType) => {
    setSelectedList(button.value);
  };
  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Row alignItems="center" style={styles.rowContainer}>
        {navigatorButtons.map((button, index) => {
          return (
            <NavigatorButton
              key={index}
              selected={button.value === selectedList}
              onSelect={handleSelect}
              {...button}
            />
          );
        })}
      </Row>
    </ThemedView>
  );
};

type NavigatorButtonProps = {
  selected: boolean;
  onSelect: (button: NavigatorButtonType) => void;
} & TouchableOpacityProps &
  NavigatorButtonType;

export const NavigatorButton = ({
  label,
  index,
  selected,
  value,
  onSelect,
  style,
  ...props
}: NavigatorButtonProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const handlePress = () => {
    onSelect({ index, label, value });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        style,
        styles.navigatorButton,
        {
          borderBottomColor: selected
            ? theme.colors.primary
            : theme.colors.surfaceVariant,
        },
      ]}
      {...props}
    >
      <ThemedText variant="bodyLarge">{label}</ThemedText>
    </TouchableOpacity>
  );
};

function useStyles() {
  const BORDER_WIDTH = 1;
  const theme = useTheme();
  return useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.surface,
        opacity: 0.9,
      },
      rowContainer: {},
      navigatorButton: {
        flex: 1,
        padding: 7,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: BORDER_WIDTH,
      },
    });
  }, [theme]);
}

export default ProfileNavigator;
