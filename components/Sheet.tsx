import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { BlurView } from "expo-blur";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemedView } from "./ThemedView";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";

type SheetProps = {
  present: boolean;
  snapPoints: BottomSheetModalProps["snapPoints"];
  backdrop?: boolean;
} & BottomSheetModalProps;

/**
 * @deprecated use SheetView instead
 */
export default function Sheet({
  present,
  backdrop = true,
  children,
  snapPoints,
  ...props
}: SheetProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);

  useEffect(() => {
    // present sheet when presnet is true
    present ? sheetRef.current?.present() : sheetRef.current?.close();
  }, [present]);

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      backdropComponent={backdrop ? renderBackdrop : null}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
}
