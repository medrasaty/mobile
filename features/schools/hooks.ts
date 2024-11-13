import { useLocalSearchParams } from "expo-router";
import { School } from "./types";

export default function useSchoolIdParam() {
  const { schoolId } = useLocalSearchParams<{ schoolId: School["id"] }>();

  return schoolId;
}
