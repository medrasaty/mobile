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
import {
  NavigatorButtonType,
  ProfileNavigatorChoices,
} from "@/features/profile/types";

type ProfileNavigatorProps = {
  onSelectChange?: (button: NavigatorButtonType) => void;
  navigatorButtons: NavigatorButtonType[];
  currentIndex: number;
} & ViewProps;

const ProfileNavigator = ({
  onSelectChange = () => {},
  navigatorButtons,
  currentIndex,
  style,
  ...props
}: ProfileNavigatorProps) => {
  const styles = useStyles();
  const handleSelect = (button: NavigatorButtonType) => {
    onSelectChange(button);
  };
  return (
    <ThemedView style={[style, styles.container]} {...props}>
      <Row alignItems="center" style={styles.rowContainer}>
        {navigatorButtons.map((button, index) => {
          return (
            <NavigatorButton
              key={index}
              currentIndex={currentIndex}
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
  currentIndex: NavigatorButtonType["index"];
  onSelect: (button: NavigatorButtonType) => void;
} & TouchableOpacityProps &
  NavigatorButtonType;

export const NavigatorButton = ({
  label,
  index,
  currentIndex,
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

  const selected = index === currentIndex;

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
