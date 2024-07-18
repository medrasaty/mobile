import { LOGIN_PAGE } from "@/constants/routes";
import { parseSession } from "@/lib/utils";
import { router } from "expo-router";
import { useSession } from "./useSession";

export default function useToken(): string {
  const { session } = useSession();

  if (session === null) {
    router.replace(LOGIN_PAGE);
  }

  const { token } = parseSession(session);
  return token as string;
}
