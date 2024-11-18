import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import { Button, IconButton, TextInput, useTheme } from "react-native-paper";
import { useShareStore } from "../store";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import useShareQuestionMutation from "../mutations";
import LoadingDialog from "@/components/LoadingDialog";

const MAX_FOOTER_HEIGHT = 65;
const FOOTER_FINAL_POSITION = 330;
const FOOTER_INITIAL_POSITION = 395;

const Footer = ({
  onSubmit,
  ...props
}: BottomSheetFooterProps & { onSubmit: (comment: string) => void }) => {
  const theme = useTheme();
  const [comment, setComment] = useState("");
  const selectedUsers = useShareStore((state) => state.selectedUsers);
  const searchValue = useShareStore((state) => state.searchValue);

  // const position = useSharedValue(FOOTER_INITIAL_POSITION);

  const isPresent = useMemo(() => {
    // determine whether to present footer or not
    return selectedUsers.length !== 0 && searchValue.trim().length === 0;
  }, [selectedUsers, searchValue]);

  const handleShare = () => {
    onSubmit(comment);
  };

  if (!isPresent) return null;
  return (
    <BottomSheetFooter
      style={{
        flexDirection: "row-reverse",
        borderTopEndRadius: 12,
        borderTopLeftRadius: 12,
        alignItems: "center",
        padding: 8,
        backgroundColor: theme.colors.primaryContainer,
      }}
      {...props}
    >
      {/* Add present animation later */}
      <TextInput
        value={comment}
        onChangeText={(text) => setComment(text)}
        dense
        theme={{ roundness: 33 }}
        style={{ flex: 1 }}
        placeholder="Write your comment here"
        mode="outlined"
      />
      <IconButton icon={"share"} mode="contained" onPress={handleShare} />
    </BottomSheetFooter>
  );
};

export default Footer;
