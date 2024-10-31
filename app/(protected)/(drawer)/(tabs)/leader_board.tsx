import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { useSession } from "@/hooks/useSession";
import React, { useRef, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Component() {
  const { signOut } = useSession();
  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </Page>
  );
}
