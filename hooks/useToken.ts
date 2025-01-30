import { LOGIN_PAGE } from "@/constants/routes";
import { router } from "expo-router";
import { useAuthSession } from "@features/auth/store";

export default function useToken(): string | null {
  const session = useAuthSession((state) => state.session);

  if (!session?.token) {
    router.replace(LOGIN_PAGE);
  }

  return session?.token ?? null;
}
