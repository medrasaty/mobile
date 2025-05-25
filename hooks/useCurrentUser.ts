import { BaseUser } from "@/types/user.types";
import { useAuthSession } from "@features/auth/store";

export default function useCurrentUser(): BaseUser {
  /**
   * return current login user as an object parsed from session
   */
  const user = useAuthSession((state) => state.session?.user);
  if (!user) {
  }

  return user as BaseUser;
}
