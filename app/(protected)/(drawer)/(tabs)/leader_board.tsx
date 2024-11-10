import Page from "@/components/Page";
import { useSession } from "@/hooks/useSession";
import React, { useState } from "react";
import { AnimatePresence, MotiView } from "moti";
import Skeleton from "@/components/Skeleton";
import { Button } from "react-native";

export default function Component() {
  const [animate, setAnimate] = useState(false);
  const [exit, setExit] = useState(false);

  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => setExit(!exit)} title="exit" />
    </Page>
  );
}

import { useReducer } from "react";
import { StyleSheet, Pressable } from "react-native";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

export function HelloWorldSkeleton() {
  const [dark, toggle] = useReducer((s) => !s, true);

  return (
    <>
      <Skeleton radius="round" height={75} width={75} />
      <Spacer />
      <Skeleton width={250} />
      <Spacer height={8} />
      <Skeleton width={"100%"} />
      <Spacer height={8} />
      <Skeleton width={"100%"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});
