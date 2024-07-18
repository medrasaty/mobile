import { LOGIN_PAGE } from "@/constants/routes";
import { Student, Teacher } from "@/definitions/user.types";
import { parseSession } from "@/lib/utils";
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
