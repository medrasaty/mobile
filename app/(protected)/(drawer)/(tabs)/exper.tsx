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

const Exper = () => {
  // refs
  const sheetRef = useSheetModalRef();
  return (
    <Page container>
      <CenterPage>
        <Button onPress={() => sheetRef?.current?.present()}>open</Button>
      </CenterPage>
      <SheetModal snapPoints={["50%"]} ref={sheetRef}>
        <ContainerView style={{ marginBottom: 20 }}>
          <TextInput mode="outlined" />
        </ContainerView>
      </SheetModal>
    </Page>
  );
};

export default Exper;
