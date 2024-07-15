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
