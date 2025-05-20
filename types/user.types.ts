import { Grade } from "./school.types";

export interface Session {
  user: BaseUser;
  token: string;
}

export interface BaseUser {
  id: number;
  pk: string;
  username: string;
  email: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  short_name: string;
  full_name: string;
  type: UserType;
  school: number;
  school_name: string;
  gender: "M" | "F";
  reputation: number;
  total_views: number;
  reach: number;
  is_superuser: boolean;
  profile_picture: string;
  avatar: string;
  thumbnail: string;
  is_private: boolean;
  contenttype: number;
  display_name: string;
}

export interface BaseSessionUser extends BaseUser {
  token: string;
}

export enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
  SYSTEM = "SYSTEM",
}
export interface Student extends BaseUser {
  studentmore: Studentmore;
}

export interface Studentmore {
  grade: number;
  section: null | string;
}

export interface Teacher extends BaseUser {
  teachermore: TeacherMore;
}

export interface TeacherMore {
  user: number;
  subjects: string[];
  grades: Grade["id"][];
  sections: string[];
}
