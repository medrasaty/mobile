import { StyleSheet } from "react-native";
import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import { useCallback, useMemo, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export const BottomSheet = () => {
  // ref
  const theme = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // Callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={handlePresentModalPress} mode="contained">
        Present Modal
      </Button>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ elevation: 10 }}
        backgroundStyle={{
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text variant="bodyLarge">solo is sheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
