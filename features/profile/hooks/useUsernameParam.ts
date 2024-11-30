import { BaseUser } from "@/types/user.types";
import { useGlobalSearchParams } from "expo-router";

export default function useUserIdParams() {
  const params = useGlobalSearchParams<{ id: BaseUser["id"] }>();
  return params.id;
}
