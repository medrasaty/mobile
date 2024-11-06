import { Session } from "@/features/auth/ctx";
import { GruvboxDarkCyan, GruvboxLightCyan } from "@/constants/Colors";
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
  return GruvboxLightCyan.colors.primary;
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

export function random(number: number) {
  /**
   * Return random number in range of provided number
   *
   */

  return Math.floor(Math.random() * (number + 1));
}

export function translateSubject(subject: string | undefined) {
  switch (subject?.toLowerCase()) {
    case "english language":
      return "اللغة الإنجليزية";
    case "arabic language":
      return "اللغة العربية";
    case "math":
      return "الرياضيات";
    case "physics":
      return "الفيزياء";
    case "chemistry":
      return "الكيمياء";
    case "biology":
      return "الاحياء";
    case "history":
      return "التاريخ";
    case "geography":
      return "الجغرافية";
    case "politics":
      return "السياسة";
    case "art":
      return "الفنون";
    case "religion":
      return "الاسلامية";
    case "science":
      return "العلوم";
    case "other":
      return "اخرى";
    default:
      return subject;
  }
}

/**
 * Compare two queryKeys
 */

export function areListsEqual(list1: any[], list2: any[]): boolean {
  if (list1.length !== list2.length) return false;

  return list1.every((item, index) => {
    const item2 = list2[index];

    // Handle objects
    if (typeof item === "object" && item !== null) {
      return JSON.stringify(item) === JSON.stringify(item2);
    }

    // Handle primitives
    return item === item2;
  });
}
