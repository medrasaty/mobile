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

export function BookmarkQuestion({
  questionID,
  isBookmarked,
}: {
  questionID: DetailQuestion["id"];
  isBookmarked: DetailQuestion["is_bookmarked"];
}) {
  const { bookmark, unbookmark } = useQuestionBookmarkMutation(questionID);
  const handlePress = () => {
    isBookmarked ? unbookmark(questionID) : bookmark(questionID);
  };

  return <Bookmark isBookmarked={isBookmarked} onPress={handlePress} />;
}

export function RegisterQuestion({
  questionID,
  isRegistered,
}: {
  questionID: DetailQuestion["id"];
  isRegistered: DetailQuestion["is_registered"];
}) {
  const { register, unregister } = useQuestionRegistryMutation(questionID);

  return (
    <>
      <RegisterIcon
        onPress={() => {
          isRegistered ? unregister(questionID) : register(questionID);
        }}
        isRegistered={isRegistered}
      />
    </>
  );
}
