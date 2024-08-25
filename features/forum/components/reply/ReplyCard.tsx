import Avatar from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Username from "@/components/Username";
import { View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";

import Entypo from "@expo/vector-icons/Entypo";
import { debugStyle } from "@/constants/styels";

type ReplyCardProps = {} & ViewProps;

export default function ReplyCard({ ...props }: ReplyCardProps) {
  const margins = 16;
  return (
    <ThemedView
      style={[
        props.style,
        { gap: 10, marginTop: margins, marginBottom: margins },
      ]}
      {...props}
    >
      <Header />
      <ThemedView style={{ gap: 4 }}>
        <Content />
        <Footer />
      </ThemedView>
    </ThemedView>
  );
}

export const Footer = () => {
  return (
    <ThemedText color="gray" variant="labelSmall">
      {new Date().toLocaleDateString()}
    </ThemedText>
  );
};

export const Header = () => {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <UserShort />
      <Entypo
        onPress={() => alert("soloisdots")}
        name="dots-three-vertical"
        size={14}
        color="black"
      />
    </ThemedView>
  );
};

export const Content = () => {
  return (
    <ThemedView>
      <ThemedText variant="bodySmall">
        شكمنيت ش شمسنيتبن نيمشنيستب شيتبنشيب بمنش تسيكبمش يب شكمنيت ش شمسنيتبن
      </ThemedText>
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
