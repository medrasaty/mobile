import { LOGIN_PAGE } from "@/constants/routes";
import { parseSession } from "@/lib/utils";
import { Student, Teacher } from "@/types/user.types";
import { router } from "expo-router";
import { useSession } from "./useSession";

export default function useCurrentUser(): Teacher | Student | null {
  /**
   * return current login user as an object parsed from session
   */
  const { session } = useSession();

  // if user is not logged in
  if (session === null) {
    router.replace(LOGIN_PAGE);
    return null;
  }

  const { user } = parseSession(session);

  return user as Teacher | Student;
}
