import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { Reply } from "@/types/forum.types";
import ReadMoreText from "@/components/ReadMoreText";
import { d } from "@/lib/dates";
import UserInfo from "@components/UserInfo";
import { useTheme } from "react-native-paper";
import { memo, useMemo } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";

type ReplyCardProps = {
  reply: Reply;
  style?: any;
};

const ReplyDate = memo(({ date }: { date: Date }) => {
  const formattedDate = useMemo(() => d(date).fromNow(), [date]);

  return (
    <ThemedText
      color="gray"
      variant="labelSmall"
      style={{ marginLeft: "auto", marginTop: 8 }}
    >
      {formattedDate}
    </ThemedText>
  );
});

const ReplyContent = memo(({ text }: { text: string }) => (
  <View style={{ marginTop: 2, marginLeft: 36 }}>
    <ReadMoreText
      variant="bodyMedium"
      numberOfLines={4}
      style={{ lineHeight: 20 }}
    >
      {text}
    </ReadMoreText>
  </View>
));

const ReplyCard = ({ reply, style }: ReplyCardProps) => {
  const theme = useTheme();
  const { close } = useBottomSheet();

  const containerStyle = useMemo(
    () => [
      style,
      {
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surfaceVariant,
      },
    ],
    [style, theme.colors.surfaceVariant]
  );

  const handleUserPress = () => {
    close();
  };

  return (
    <View style={containerStyle}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <UserInfo
          showSchool={false}
          avatarSize={32}
          user={reply.owner}
          onPress={handleUserPress}
        />
        <ReplyDate date={reply.created} />
      </View>
      <ReplyContent text={reply.text} />
    </View>
  );
};

export default memo(ReplyCard);
