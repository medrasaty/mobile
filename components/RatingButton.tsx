import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ViewProps } from "react-native";
import {
  TouchableRipple,
  useTheme,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import View from "./styled/View";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthClient from "@/hooks/useAuthClient";
import { DetailQuestion, Question } from "@/definitions/forum.types";
import { useRegistries } from "@/hooks/notifications/useRegistries";
import { useRegistryMutation } from "@/hooks/notifications/registryMutation";
import { useSnackbar } from "@/contexts/SnackbarContext";

type RatingButtonProps = {
  direction: "up" | "down";
  onPress: () => void;
  isPressed?: boolean;
} & ViewProps;

type IconName = "caretup" | "caretdown";

export default function RatingButton({
  direction,
  isPressed = false,
  onPress,
  style,
  ...props
}: RatingButtonProps) {
  const theme = useTheme();
  const icon_name: IconName = `caret${direction}`;
  const backgroundColor = isPressed ? theme.colors.primary : undefined;
  return (
    <View
      style={[
        style,
        {
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderRadius: 100,
          overflow: "hidden",
          width: 50,
          height: 50,
        },
      ]}
      {...props}
    >
      <TouchableRipple
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <AntDesign
          name={icon_name}
          size={15}
          color={
            isPressed ? theme.colors.onPrimary : theme.colors.onPrimaryContainer
          }
        />
      </TouchableRipple>
    </View>
  );
}

const useIconProps = () => {
  const theme = useTheme();
  return {
    size: 24,
    color: theme.colors.primary,
  };
};

export function Bookmark({ question }: { question: DetailQuestion }) {
  const iconProps = useIconProps();
  return <MaterialCommunityIcons {...iconProps} name="bookmark-outline" />;
}

export function RegisterQuestion({ question }: { question: DetailQuestion }) {
  const iconProps = useIconProps();
  const { data: registries, isLoading } = useRegistries();

  const { register, unregister } = useRegistryMutation();

  if (isLoading) return <ActivityIndicator size={14} />;

  if (registries) {
    const registry = registries.filter(
      (registery) => registery.question == question.id
    );

    return (
      <>
        <MaterialCommunityIcons
          onPress={() => {
            registry.length > 0
              ? unregister(question.id)
              : register(question.id);
          }}
          name={registry.length > 0 ? "bell" : "bell-outline"}
          {...iconProps}
        />
      </>
    );
  }
}
