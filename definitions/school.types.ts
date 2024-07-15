export interface School {
  id: number;
  name: string;
  location: string;
  logo: null | string;
  members_count: number;
  grades: number[];
  sections: string[];
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

export interface Subject {
  id: string;
  name: string;
  catagory: string;
}

export const GENDER = {
  Male: "M",
  Female: "F",
};

export interface Section {
  id: string;
  name: string;
  school: number;
  description: string;
  grade: number;
  students_count: number;
  teachers_count: number;
}

export interface Grade {
  id: number;
  grade: number;
  level: Level;
}
