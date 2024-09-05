import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { useSession } from "@/hooks/useSession";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { ThemedText } from "@/components/ThemedText";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  return (
    <Page container>
      <ThemedText>Profile</ThemedText>
    </Page>
  );
};

export default Profile;
