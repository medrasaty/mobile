import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "@/components/styled";
import { useSession } from "@/hooks/useSession";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import { Item, Number } from "@/components/Item";
import { useAlert } from "@/contexts/AlertDialogContext";

export default function NumberPage() {
  const { signOut } = useSession();

  return (
    <SafeAreaView>
      <Page
        container
        style={{ gap: 10, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={signOut}>signuot</Button>
      </Page>
    </SafeAreaView>
  );
}
