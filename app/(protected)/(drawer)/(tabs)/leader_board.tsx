import Page from "@/components/Page";
import { useSession } from "@/hooks/useSession";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Button } from "react-native-paper";

export default function Component() {
  const { signOut } = useSession();

  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => signOut()}>Sign Out</Button>
      <Ionicons name="person" size={30} color={"gray"} />
    </Page>
  );
}
