import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export default function useDismisBottomSheetModal(dismiss: boolean = false) {
  const { dismiss: dismissModal } = useBottomSheetModal();

  useEffect(() => {
    if (dismiss) dismissModal();
  }, [dismiss]);
}
