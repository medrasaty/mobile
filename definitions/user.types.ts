import { Grade } from "./school.types";

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
  profile_picture: null | string;
  background_picture: null | string;
}

export interface Teacher extends BaseUser {
  teachermore: TeacherMore;
}

export interface TeacherMore {
  user: number;
  subjects: string[];
  grades: Grade["id"][];
  sections: string[];
  bio: string;
  profile_picture: null;
}
