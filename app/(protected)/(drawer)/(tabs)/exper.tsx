import React, { useCallback, useMemo } from "react";
import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { Button } from "react-native-paper";
import Sheet, { useSheetRef, SheetModal, useSheetModalRef } from "@components/Sheet";
import { ThemedText } from "@components/ThemedText";
import View from "@components/styled/View";

const Exper = () => {
  // refs
  const bottomSheetRef = useSheetRef();
  const modalSheetRef = useSheetModalRef();

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handlePresentModal = useCallback(() => {
    if (modalSheetRef.current) {
      // The method exists at runtime but TypeScript doesn't know about it
      (modalSheetRef.current as any).present();
    }
  }, []);

  const handleDismissModal = useCallback(() => {
    if (modalSheetRef.current) {
      // The method exists at runtime but TypeScript doesn't know about it
      (modalSheetRef.current as any).dismiss();
    }
  }, []);

  return (
    <Page container>
      <CenterPage>
        <View style={{ width: "100%", alignItems: "center", gap: 16 }}>
          <Button mode="outlined" onPress={handleOpenSheet}>
            Open Regular Sheet
          </Button>
          <Button mode="contained" onPress={handlePresentModal}>
            Open Modal Sheet
          </Button>
        </View>
      </CenterPage>
      
      {/* Regular Bottom Sheet */}
      <Sheet 
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialIndex={-1}
      >
        <View style={{ alignItems: "center" }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 12 }}>Regular Sheet</ThemedText>
          <ThemedText>This is always mounted but hidden</ThemedText>
          <Button mode="contained" onPress={handleCloseSheet} style={{ marginTop: 16 }}>
            Close
          </Button>
        </View>
      </Sheet>
      
      {/* Modal Bottom Sheet */}
      <SheetModal 
        ref={modalSheetRef}
        snapPoints={snapPoints}
        index={1}
      >
        
        <View style={{ alignItems: "center" }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 12 }}>Modal Sheet</ThemedText>
          <ThemedText>This is mounted only when presented</ThemedText>
          <Button mode="contained" onPress={handleDismissModal} style={{ marginTop: 16 }}>
            Dismiss
          </Button>
        </View>
      </SheetModal>
    </Page>
  );
};

export default Exper;

