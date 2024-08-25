import { useQuestionRegistryMutation } from "@/features/notifications/hooks/registryMutation";
import { useRegistries } from "@/features/notifications/hooks/useRegistries";
import useAuthClient from "@/hooks/useAuthClient";
import { DetailQuestion, Question } from "@/types/forum.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import { ViewProps } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import View from "@/components/styled/View";
import useQuestionBookmarkMutation from "../hooks/useQuestionBookmarkMutation";

type RatingButtonProps = {
  direction: "up" | "down";
  onPress: () => void;
  isPressed?: boolean;
} & ViewProps;

type IconName = "caretup" | "caretdown";

const ButtonSize = 40;

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
          width: ButtonSize,
          height: ButtonSize,
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
          size={ButtonSize / 3}
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
    size: ButtonSize / 2, // half RatingButton size
    color: theme.colors.primary,
  };
};

export function BookmarkQuestion({ question }: { question: DetailQuestion }) {
  const iconProps = useIconProps();
  const { bookmark, unbookmark } = useQuestionBookmarkMutation(question.id);
  const handlePress = () => {
    question.is_bookmarked ? unbookmark(question.id) : bookmark(question.id);
  };
  return (
    <MaterialCommunityIcons
      {...iconProps}
      name={question.is_bookmarked ? "bookmark" : "bookmark-outline"}
      onPress={handlePress}
    />
  );
}

export function RegisterQuestion({ question }: { question: DetailQuestion }) {
  const { register, unregister } = useQuestionRegistryMutation(question.id);

  return (
    <>
      <RegisterIcon
        onPress={() => {
          question.is_registered
            ? unregister(question.id)
            : register(question.id);
        }}
        isRegistered={question.is_registered}
      />
    </>
  );
}

const RegisterIcon = ({
  isRegistered,
  onPress,
}: {
  isRegistered: boolean | null;
  onPress: () => void;
}) => {
  const iconProps = useIconProps();
  const iconName = isRegistered ? "bell" : "bell-outline";
  return (
    <MaterialCommunityIcons {...iconProps} onPress={onPress} name={iconName} />
  );
};
