/* interfaces for auth related types */
import { Axios } from "axios";

export interface ExtednedSession {
  // TODO: remove rest object ( not needed )
  rest: Axios;
  user: ExtendedUser;
}

export type UserType = "STUDENT" | "TEACHER" | "ADMIN" | "SYSTEM";

export const Types = {
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  ADMIN: "ADMIN",
  SYSTEM: "SYSTEM",
};

export interface ExtendedUser {
  username: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  full_name: string;
  type: UserType;
  school: number;
  gender: string;
  is_superuser: boolean;
  token: string;
}

export interface BaseUser {
  id: number;
  username: string;
  email: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  full_name: string;
  type: UserType;
  school: number;
  school_name: string;
  gender: "M" | "F";
  is_superuser: boolean;
  reputation_points: number;
}
