import React, { forwardRef, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Portal, useTheme } from "react-native-paper";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { debugStyle } from "@/constants/styels";

export type SheetProps = {
  /** Whether to show the backdrop */
  backdrop?: boolean;
  /** Background color of the sheet (defaults to surface color from theme) */
  backgroundColor?: string;
  /** Handle color (defaults to primary color from theme) */
  handleColor?: string;
  /** Initial snap point index */
  initialIndex?: number;
  /** Custom content container style */
  contentContainerStyle?: object;
  /** Enable dynamic sizing (auto-adjusts to content) */
  enableDynamicSizing?: boolean;
  /** Children to render inside the sheet */
  children: React.ReactNode;
} & BottomSheetProps;

export type SheetModalProps = {
  /** Whether to show the backdrop */
  backdrop?: boolean;
  /** Background color of the sheet */
  backgroundColor?: string;
  /** Handle color */
  handleColor?: string;
  /** Custom content container style */
  contentContainerStyle?: object;
  /** Children to render inside the sheet */
  children: React.ReactNode;
} & Omit<BottomSheetModalProps, "backdropComponent">;

/**
 * A reusable bottom sheet component with dynamic content sizing
 */
export const Sheet = forwardRef<BottomSheet, SheetProps>(
  (
    {
      backdrop = true,
      backgroundColor,
      initialIndex = -1,
      contentContainerStyle,
      enableDynamicSizing = true,
      children,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const isDarkMode = theme.dark;

    // Render backdrop component
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
          pressBehavior="close"
        />
      ),
      []
    );

    // Apply theme-aware colors
    const bgColor =
      backgroundColor ||
      (isDarkMode
        ? theme.colors.elevation.level3
        : theme.colors.surfaceVariant);

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          index={initialIndex}
          enablePanDownToClose
          enableContentPanningGesture
          enableDynamicSizing={enableDynamicSizing}
          handleIndicatorStyle={[
            styles.handle,
            { backgroundColor: theme.colors.primary, opacity: 1 },
          ]}
          backgroundStyle={[
            styles.background, 
            { backgroundColor: bgColor }
          ]}
          backdropComponent={backdrop ? renderBackdrop : undefined}
          {...props}
        >
          <BottomSheetView
            style={[styles.contentContainer, contentContainerStyle]}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  }
);

/**
 * A modal bottom sheet component
 */
export const SheetModal = forwardRef<BottomSheetModal, SheetModalProps>(
  (
    {
      backdrop = true,
      backgroundColor,
      handleColor,
      snapPoints = ["25%", "50%", "90%"],
      contentContainerStyle,
      children,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const isDarkMode = theme.dark;

    // Render backdrop component
    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
          pressBehavior="close"
        />
      ),
      []
    );

    // Apply theme-aware colors
    const bgColor =
      backgroundColor ||
      (isDarkMode
        ? theme.colors.elevation.level3
        : theme.colors.surfaceVariant);
    const handleBarColor = handleColor || theme.colors.primary;

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={[
          styles.handle,
          { backgroundColor: handleBarColor, opacity: 1 },
        ]}
        backgroundStyle={[
          styles.background, 
          { backgroundColor: bgColor, opacity: 1 }
        ]}
        backdropComponent={backdrop ? renderBackdrop : undefined}
        {...props}
      >
        <BottomSheetView
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

/**
 * Hook to create and manage a bottom sheet ref
 */
export function useSheetRef() {
  return useRef<BottomSheet>(null);
}

/**
 * Hook to create and manage a bottom sheet modal ref
 * The methods present() and dismiss() exist at runtime but
 * might not be properly typed in the type definitions
 */
export function useSheetModalRef() {
  // This satisfies the TypeScript compiler but allows access to present() and dismiss()
  return useRef<BottomSheetModal>(null);
}

const styles = StyleSheet.create({
  background: {
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  handle: {
    width: 40,
    height: 6, // Increased height for better visibility
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 12,
  },
});

export default Sheet;
