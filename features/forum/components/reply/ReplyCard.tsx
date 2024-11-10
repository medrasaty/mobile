import Avatar from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Username from "@/components/Username";
import { View, ViewProps } from "react-native";
import { Reply } from "@/types/forum.types";
import User from "@/components/User";
import ReadMoreText from "@/components/ReadMoreText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ReplyCardProps = {
  reply: Reply;
} & ViewProps;

export default function ReplyCard({ reply, ...props }: ReplyCardProps) {
  const margins = 16;
  return (
    <ThemedView
      style={[
        props.style,
        { gap: 4, marginTop: margins, marginBottom: margins },
      ]}
      {...props}
    >
      <Header reply={reply} />
      <ThemedView style={{ gap: 4 }}>
        <ReplyContent reply={reply} />
        <Footer reply={reply} />
      </ThemedView>
    </ThemedView>
  );
}

export const Header = ({ reply }: { reply: Reply }) => {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", gap: 4 }}>
        <User user={reply.owner} />
        <ReplyCreatedDate created={reply.created} />
      </View>
      <MaterialCommunityIcons name="dots-vertical" size={18} color="black" />
    </ThemedView>
  );
};

export const ReplyCreatedDate = ({
  created,
}: {
  created: Reply["created"];
}) => {
  return (
    <ThemedText color="gray" variant="labelSmall">
      {created.toLocaleTimeString()}
    </ThemedText>
  );
};

export const Footer = ({ reply }: { reply: Reply }) => {
  // TODO: use this component once you add new features you want to put them in the bottom
  return null;
};

export const ReplyContent = ({ reply }: { reply: Reply }) => {
  return (
    <ThemedView style={{ marginStart: 37 }}>
      <ReadMoreText bold variant="bodySmall">
        {reply.text}
      </ReadMoreText>
    </ThemedView>
  );
};

export const UserShort = () => {
  const avatar = require("@/assets/images/splash.png");
  return (
    <>
      <ThemedView
        style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
      >
        <Avatar source={avatar} size={32} />
        <ThemedView>
          <Username name={"solo shayea"} username="username" />
          <ThemedText variant="labelSmall">medrasaty</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
};
