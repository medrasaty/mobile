import React, { useState } from "react";
import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import Sheet, {
  SheetModal,
  useSheetModalRef,
  useSheetRef,
} from "@components/Sheet";
import { ContainerView } from "@components/styled";
import { TextInput, Button } from "react-native-paper";
import useStore from "@/store/index";
import { ThemedText } from "@components/ThemedText";

const Exper = () => {
  const isNotificationActive = useStore((state) => state.isNotificationActive);
  const setActiveNotification = useStore(
    (state) => state.setNotificationActive
  );

  return (
    <Page container>
      <CenterPage style={{ gap: 20 }}>
        <Button
          mode="elevated"
          onPress={() => setActiveNotification(!isNotificationActive)}
        >
          toggle activity
        </Button>
        <ThemedText>{isNotificationActive ? "active" : "inactive"}</ThemedText>
      </CenterPage>
    </Page>
  );
};

export default Exper;
