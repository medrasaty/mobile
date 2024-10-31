import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { useSession } from "@/hooks/useSession";
import React, { useRef, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

// Sample data with variable content length
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
  content: "Lorem ipsum ".repeat(Math.floor(Math.random() * 5) + 1), // Random content length
}));

export default function Component() {
  const { signOut } = useSession();
  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </Page>
  );
}
