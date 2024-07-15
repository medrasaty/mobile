import { BaseUser } from "./session";

export interface Student extends BaseUser {
  studentmore: Studentmore;
}

export interface Studentmore {
  grade: number;
  section: null | string;
  profile_picture: null | string;
  background_picture: null | string;
}

export interface Grade {
  id: number;
  grade: number;
  level: Level;
}

export enum Level {
  Elementary = "elementary",
  High = "high",
  Middle = "middle",
}

export interface AddStudentFormData {
  email: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  school: number;
  gender: string;
  grade: number;
}
