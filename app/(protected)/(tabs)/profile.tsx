import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "@/components/styled";
import { calcNewRatingsValue } from "@/features/forum/utils";
import { useSession } from "@/hooks/useSession";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Gallery from "react-native-awesome-gallery";
import { Button } from "react-native-paper";

export default function HomePage() {
  const { signOut } = useSession();
  const newRatingsValue = calcNewRatingsValue(9, -1, 0);

  return (
    <SafeAreaView>
      <Page container>
        <ThemedText>{newRatingsValue}</ThemedText>
      </Page>
    </SafeAreaView>
  );
}
