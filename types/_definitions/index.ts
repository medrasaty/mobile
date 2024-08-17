export type { ExtednedSession, ExtendedUser, UserTypes } from "./session";

export interface School {
  id: number;
  name: string;
  location: string;
  logo: null | string;
  members_count: number;
  grades: number[];
  sections: string[];
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

export interface AddSchoolFormData {
  name: string;
  location: string;
  logo?: File;
  grades?: string[];
}
