import { Session } from "@/auth/ctx";
import { CyanDark, CyanLight } from "@/constants/Colors";
import { useSession } from "@/hooks/useSession";
import { Subject } from "@/types/school.types";
import { BaseUser, UserType } from "@/types/user.types";
import { useTheme } from "react-native-paper";

export function parseSession(session: string | null): Session {
  try {
    // if session is valid
    return JSON.parse(session);
  } catch (error) {
    // clear session
    throw Error("session is invalid");
  }
}

export function getSubjectColor(subject: Subject["name"]) {
  subject = subject.toLowerCase();
  // FIXME: add custom colors to each subject
  return CyanLight.colors.primary;
}

export function is_student(user: BaseUser) {
  return user.type === UserType.STUDENT;
}

export function is_teacher(user: BaseUser) {
  return user.type === UserType.TEACHER;
}

export function translateDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getUTCMonth();
  const day = date.getDay();

  return ` ${year}-${month}-${day}`;
}
