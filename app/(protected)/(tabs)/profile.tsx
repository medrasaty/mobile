import Page from "@/components/Page";
import React, { useEffect, useRef } from "react";
import { Button } from "react-native-paper";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => {}}>solo</Button>
    </Page>
  );
};

export default Profile;
