import { useMemo } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default function useForumPictureStyle() {
  return useMemo(() => {
    return {
      height: 160,
      borderRadius: 12,
      backgroundColor: "gray",
    };
  }, []);
}
