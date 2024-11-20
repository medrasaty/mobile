import { BaseUser } from "@/types/user.types";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
  useSegments,
} from "expo-router";
import { useState, useEffect } from "react";

export default function useUsernameParam() {
  const { username } = useGlobalSearchParams<{
    username: BaseUser["username"];
  }>();

  return username;
}
