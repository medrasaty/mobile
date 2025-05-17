import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useRef } from "react";
import { useTheme } from "react-native-paper";

type SheetViewProps = React.PropsWithChildren<{
  backdrop?: boolean;
}> &
  BottomSheetModalProps;

// create a forward ref BottomSheet
export const SheetView = forwardRef<BottomSheetModal, SheetViewProps>(
  ({ backdrop = true, ...props }, ref) => {
    const theme = useTheme();

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
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
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        backdropComponent={backdrop ? renderBackdrop : null}
      >
        {props.children}
      </BottomSheetModal>
    );
  }
);

export function useSheetViewRef() {
  return useRef<BottomSheet>(null);
}

export default SheetView;
