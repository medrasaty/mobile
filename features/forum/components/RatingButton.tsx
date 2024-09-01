import { useQuestionRegistryMutation } from "@/features/notifications/hooks/registryMutation";
import { DetailQuestion, Question } from "@/types/forum.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ViewProps } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import View from "@/components/styled/View";
import useQuestionBookmarkMutation from "../hooks/useQuestionBookmarkMutation";
import Bookmark from "./Bookmark";
import useActionsProps from "../hooks/useIconProps";
import { RatingButtonSize } from "../hooks/useIconProps";
import { RegisterIcon } from "./Icons";

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
  const { color } = useActionsProps();
  const backgroundColor = isPressed ? color : undefined;
  return (
    <View
      style={[
        style,
        {
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderColor: color,
          borderRadius: 100,
          overflow: "hidden",
          width: RatingButtonSize,
          height: RatingButtonSize,
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
          size={RatingButtonSize / 3}
          color={
            isPressed ? theme.colors.onPrimary : theme.colors.onPrimaryContainer
          }
        />
      </TouchableRipple>
    </View>
  );
}

export function BookmarkQuestion({ question }: { question: DetailQuestion }) {
  const { bookmark, unbookmark } = useQuestionBookmarkMutation(question.id);
  const handlePress = () => {
    question.is_bookmarked ? unbookmark(question.id) : bookmark(question.id);
  };

  return (
    <Bookmark isBookmarked={question.is_bookmarked} onPress={handlePress} />
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
