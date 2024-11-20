import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { useTheme } from "react-native-paper";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type SheetViewProps = React.PropsWithChildren<{
  backdrop?: boolean;
}> &
  BottomSheetModalProps;

// create a forward ref BottomSheet
export const SheetView = forwardRef<BottomSheetModal, SheetViewProps>(
  ({ backdrop = true, ...props }, ref) => {
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

    return (
      <BottomSheetModal
        ref={ref}
        {...props}
        enableDismissOnClose
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        backdropComponent={backdrop ? renderBackdrop : null}
      >
        {props.children}
      </BottomSheetModal>
    );
  }
);

export function useSheetViewRef() {
  return useRef<BottomSheetModal>(null);
}

export default SheetView;
